#!/usr/bin/env python3
"""Transaction view"""

from api.v1.utils import TIMESTAMP_FMT
from api.v1.views import app_views
from api.v1.auth.middleware import token_required
from api.models.user import User
from api.models.transaction import Transaction
from flask import abort, jsonify, request, Response
import json
from bson.objectid import ObjectId
from datetime import datetime
from flask import url_for
from api.models.goal import Goal


@app_views.route("/transactions", methods=["POST"])
@token_required
def create_transaction(current_user: User) -> Response:
    """POST /api/v1/transactions

    Form body:
      - category_id
      - budget_id
      - goal_id
      - type
      - amount
      - date
      - description
    """
    payload = request.form
    if "category_id" not in payload:
        abort(400, "category_id is missing")
    if "budget_id" not in payload:
        abort(400, "budget_id is missing")
    if "goal_id" not in payload:
        abort(400, "goal_id is missing")
    if "type" not in payload:
        abort(400, "type is missing")
    if "amount" not in payload:
        abort(400, "amount is missing")
    if "date" not in payload:
        abort(400, "date is missing")
    if "description" not in payload:
        abort(400, "description is missing")
    try:
        transaction = Transaction(**payload)
        transaction.user_id = current_user.id
        transaction.save()
        goal = Goal(id=transaction.goal_id).first()
        goal.current_amount += transaction.amount
        if goal.current >= goal.target:
            goal.status = "reached"
        goal.save()
        return jsonify(json.loads(transaction.to_json())), 201
    except Exception as e:
        abort(400, str(e))


@app_views.route("/transactions", methods=["GET"])
@token_required
def get_transactions(current_user: User) -> Response:
    """GET /api/v1/transactions
    Retrieve all transactions for the current user
    """
    transactions = Transaction.objects(user_id=current_user.id)
    return jsonify(json.loads(transactions.to_json()))


@app_views.route("/transactions/<transaction_id>", methods=["GET"])
@token_required
def get_transaction(current_user: User, transaction_id: str) -> Response:
    """GET /api/v1/transactions/<transaction_id>
    Retrieve a single transaction
    """
    transaction = Transaction.objects(id=transaction_id).first()
    if transaction is None:
        abort(404)
    if transaction.user_id != current_user.id:
        abort(403)
    return jsonify(json.loads(transaction.to_json()))


@app_views.route("/transactions/<transaction_id>", methods=["PUT"])
@token_required
def update_transaction(current_user: User, transaction_id: str) -> Response:
    """PUT /api/v1/transactions/<transaction_id>
    Update a single transaction

    Form body:
      - category_id (optional)
      - budget_id (optional)
      - goal_id (optional)
      - type (optional)
      - amount (optional)
      - date (optional)
      - description (optional)

    Return:
      - Updated transaction in JSON
      - 404 if transaction_id is not found
      - 403 if transaction does not belong to current user
      - 400 if transaction update fails
    """
    transaction = Transaction.objects(id=transaction_id).first()
    if transaction is None:
        abort(404)
    if transaction.user_id != current_user.id:
        abort(403)
    payload = request.form

    try:
        if "category_id" in payload:
            transaction.category_id = payload["category_id"]
        if "budget_id" in payload:
            transaction.budget_id = payload["budget_id"]
        if "goal_id" in payload:
            transaction.goal_id = payload["goal_id"]
        if "type" in payload:
            transaction.type = payload["type"]
        if "amount" in payload:
            transaction.amount = payload["amount"]
        if "date" in payload:
            transaction.date = payload["date"]
        if "description" in payload:
            transaction.description = payload["description"]
        transaction.save()
        return jsonify(json.loads(transaction.to_json()))
    except Exception as e:
        abort(400, str(e))


@app_views.route("/transactions/<transaction_id>", methods=["DELETE"])
@token_required
def delete_transaction(current_user: User, transaction_id: str) -> Response:
    """DELETE /api/v1/transactions/<transaction_id>
    Delete a single transaction

    Return:
      - 200 on successful delete
      - 404 if transaction_id is not found
      - 403 if transaction does not belong to current user
      - 400 if transaction delete fails
    """
    transaction = Transaction.objects(id=transaction_id).first()
    if transaction is None:
        abort(404)
    if transaction.user_id != current_user.id:
        abort(403)
    try:
        transaction.delete()
        return jsonify({}), 200
    except Exception as e:
        abort(400, str(e))


@app_views.route("/transactions/search", methods=["GET"])
@token_required
def search_transactions(current_user: User) -> Response:
    """GET /api/v1/transactions/search
    Search transactions that belong to a particular user.
    Search by amount, date, and description, type, category_id, budget_id, goal_id.
    Category id can be multiple. If multiple, separate by comma

    Query parameters:
        - amount
        - date
        - description
        - type
        - category_id
        - budget_id
        - goal_id
        - amount_operator (optional)
        - sort_order (optional)
        - sort_by (optional)
        - page (optional)
        - per_page (optional)

    Return:
      - List of matched transactions in JSON
    """
    payload = request.args
    amount = payload.get("amount")
    date = payload.get("date")
    description = payload.get("description")
    type = payload.get("type")
    category_id = payload.get("category_id")
    budget_id = payload.get("budget_id")
    goal_id = payload.get("goal_id")

    match_stage = {"$match": {"user_id": ObjectId(current_user.id)}}

    if amount:
        amount = float(amount)
        amount_operator = payload.get("amount_operator", "gte")
        if amount_operator == "gte":
            match_stage["$match"]["amount"] = {"$gte": amount}
        elif amount_operator == "lte":
            match_stage["$match"]["amount"] = {"$lte": amount}
        elif amount_operator == "gt":
            match_stage["$match"]["amount"] = {"$gt": amount}
        elif amount_operator == "lt":
            match_stage["$match"]["amount"] = {"$lt": amount}
        else:
            match_stage["$match"]["amount"] = amount
    if date:
        match_stage["$match"]["date"] = datetime.strptime(
            date, TIMESTAMP_FMT
        ).date()
    if description:
        match_stage["$match"]["description"] = {
            "$regex": description.lower(),
            "$options": "i",
        }
    if type:
        if type != "expense" and type != "income":
            abort(400, "Invalid type")
        match_stage["$match"]["type"] = type
    if category_id:
        category_ids = [ObjectId(id) for id in category_id.split(",")]
        match_stage["$match"]["category_id"] = {"$in": category_ids}
    if budget_id:
        match_stage["$match"]["budget_id"] = ObjectId(budget_id)
    if goal_id:
        match_stage["$match"]["goal_id"] = ObjectId(goal_id)

    pipeline = [match_stage]

    # Sort stage
    sort_order = payload.get("sort_order", "desc")
    sort_by = payload.get("sort_by", "date")
    if sort_by != "amount" and sort_by != "date" and sort_by != "type":
        abort(400, "Invalid sort_by")
    if sort_order.lower() == "asc":
        pipeline.append({"$sort": {sort_by: 1}})  # ascending order
    else:
        pipeline.append({"$sort": {sort_by: -1}})  # descending order

    # Count stage
    count_pipeline = pipeline.copy()
    count_pipeline.append({"$count": "count"})
    count_result = list(Transaction.objects.aggregate(*count_pipeline))
    total_transactions = count_result[0]["count"] if count_result else 0

    # Pagination stage
    page = int(payload.get("page", 1))
    per_page = int(payload.get("per_page", 10))
    pipeline.append({"$skip": (page - 1) * per_page})
    pipeline.append({"$limit": per_page})

    transactions = list(Transaction.objects.aggregate(*pipeline))
    for transaction in transactions:
        transaction["id"] = str(transaction["_id"])
        del transaction["_id"]
        transaction["user_id"] = str(transaction["user_id"])
        transaction["category_id"] = str(transaction["category_id"])
        transaction["budget_id"] = str(transaction["budget_id"])
        transaction["goal_id"] = str(transaction["goal_id"])
        transaction["date"] = transaction["date"].isoformat()

    # Calculate next and prev URLs
    total_pages = total_transactions // per_page
    if total_transactions % per_page:
        total_pages += 1
    args = request.args.copy()  # Get all query parameters
    args["page"] = page + 1
    next_url = (
        url_for("app_views.search_transactions", _external=True, **args)
        if page < total_pages
        else None
    )
    args["page"] = page - 1
    prev_url = (
        url_for("app_views.search_transactions", _external=True, **args)
        if page > 1
        else None
    )

    result = {
        "page": page,
        "total_pages": total_pages,
        "per_page": per_page,
        "next": next_url,
        "prev": prev_url,
        "transactions": transactions,
    }

    return jsonify(result)
