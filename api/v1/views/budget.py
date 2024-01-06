#!/usr/bin/env python3
"""This module contains Budgets views"""
from datetime import datetime
import json
from flask import Response, abort, jsonify, request
from api.models.budget import Budget
from api.models.user import User
from api.v1.auth.middleware import token_required
from api.v1.views import app_views
from api.models.transaction import Transaction


@app_views.route("/budgets", methods=["POST"])
@token_required
def create_budget(current_user: User) -> Response:
    """POST /api/v1/budgets
    Form body:
        - name
        - limit
        - start_date (optional)
        - end_date
        - category_id
    Return:
        - newly created budget in JSON
        - 400 on parameter errors
    """
    payload = request.form
    if "name" not in payload:
        abort(400, "name is missing")
    if "limit" not in payload:
        abort(400, "limit is missing or invalid")
    if "end_date" not in payload:
        abort(400, "end_date is missing")
    if "category_id" not in payload:
        abort(400, "category_id is missing")
    name = payload.get("name")
    existing_budget = Budget.objects(name=name).first()
    if existing_budget is not None:
        abort(400, "Budget with name: {} already exists".format(name))
    try:
        budget = Budget()
        budget.user_id = current_user.id
        budget.limit = payload.get("limit")
        budget.name = name
        budget.start_date = datetime.fromisoformat(
            payload.get("start_date", datetime.utcnow().isoformat())
        ).date()
        budget.end_date = datetime.fromisoformat(
            payload.get("end_date")
        ).date()
        budget.category_id = payload.get("category_id")
        budget.save()

        result = json.loads(budget.to_json())

        return jsonify(result), 201
    except Exception as e:
        print(e)
        abort(400, "Problem creating budget: {}".format(e))


@app_views.route("/budgets/<budget_id>", methods=["GET"])
@token_required
def view_single_budget(current_user: User, budget_id: str = None) -> Response:
    """GET /api/v1/budgets/<budget_id>
    Path params:
        - budget_id
    Return:
        - Budget info in JSON
    """
    if budget_id is None:
        abort(404)
    budget = None
    budget = Budget.objects(id=budget_id).first()
    if budget is None:
        abort(404)
    if current_user.id != budget.user_id:
        abort(403)

    result = json.loads(budget.to_json())

    return jsonify(result), 200


@app_views.route("/users/<user_id>/budgets", methods=["GET"])
@token_required
def view_budgets(current_user: User, user_id: str = None) -> Response:
    """GET /api/v1/users/<user_id>/budgets
    Gets all budgets related to a particular user
    Path params:
        - user_id
    Return:
        - Budget info in JSON
    """
    if user_id == "me":
        user_id = current_user.id
    if user_id is None:
        abort(404)
    user = User.objects(id=user_id).first()
    if user is None:
        abort(404)
    budgets = list(Budget.objects(user_id=user_id))
    result = [json.loads(budget.to_json()) for budget in budgets]
    return jsonify(result), 200


@app_views.route("/budgets/<budget_id>", methods=["PUT"])
@token_required
def update_budget(current_user: User, budget_id: str = None) -> Response:
    """PUT /api/v1/budgets/<budget_id>
    Path params:
        - budget_id
    Form body:
        - name (optional)
        - limit (optional)
        - start_date (optional)
        - end_date (optional)
        - category_id (optional)
    Return:
        - Updated budget in JSON
        - 404 if the budget is not found
        - 400 if budget update fails
    """
    # Validate
    if budget_id is None:
        abort(404)
    try:
        budget = Budget.objects(id=budget_id).first()
    except Exception:
        abort(404)
    if budget is None:
        abort(404)
    if current_user.id != budget.user_id:
        abort(403)
    payload = request.form

    # Update data
    try:
        if "name" in payload:
            budget.name = payload.get("name")
        if "limit" in payload:
            if Transaction.objects(budget_id=budget_id).count() > 0:
                abort(400, "Cannot update limit on budget with transactions")
            budget.limit = payload.get("limit")
        if "start_date" in payload:
            budget.start_date = datetime.fromisoformat(
                payload.get("start_date")
            ).date()
        if "end_date" in payload:
            budget.end_date = datetime.fromisoformat(
                payload.get("end_date")
            ).date()
        if "category_id" in payload:
            budget.category_id = payload.get("category_id")

        budget.save()
    except Exception as e:
        abort(400, "Budget update failed: {}".format(e))

    # return updated budget
    result = json.loads(budget.to_json())

    return jsonify(result)


@app_views.route("/budgets/<budget_id>", methods=["DELETE"])
@token_required
def delete_budget(current_user: User, budget_id: str = None) -> Response:
    """DELETE /api/v1/budgets/<budget_id>
    Path params:
        - budget_id
    Return:
        - Empty json with status 200
    """
    if budget_id is None:
        abort(404)
    budget = Budget.objects(id=budget_id).first()
    if budget is None:
        abort(404)
    if current_user.id != budget.user_id:
        abort(403)
    budget.delete()
    return jsonify({}), 200
