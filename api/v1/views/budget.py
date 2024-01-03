#!/usr/bin/env python3
"""This module contains Budgets views"""
from datetime import datetime
import json
from flask import Response, abort, jsonify, request
from api.models.budget import Budget
from api.models.user import User
from api.v1.auth.auth_middleware import token_required
from api.v1.auth.passwords import hash_password
from api.v1.utils import remove_file, save_profile_pic
from api.v1.views import app_views


@app_views.route("/budgets", methods=["POST"])
def create_budget() -> Response:
    """POST /api/v1/budgets
    Form body:
        - user_id
        - name
        - limit
        - start_date
        - end_date
    Return:
        - newly created budget in JSON
        - 400 on parameter errors
    """
    payload = request.form
    if "user_id" not in payload:
        abort(400, "budget_id is missing")
    if "name" not in payload:
        abort(400, "name is missing")
    if "limit" not in payload and not isinstance(limit, int):
        abort(400, "limit is missing or invalid")
    if "end_date" not in payload:
        abort(400, "start_date is missing")
    name = payload.get('name')
    existing_budget = Budget.objects(name=name).first()
    if existing_budget is not None:
        abort(400, "Budget with name: {} already exists".format(name))
    try:
        budget = Budget()
        budget.user_id = payload.get("user_id")
        budget.limit = payload.get("limit")
        budget.name = name
        budget.start_date = datetime.fromisoformat(
            payload.get('start_date')
        ).date()
        budget.end_date = datetime.fromisoformat(
            payload.get('end_date')
        ).date()
        budget.save()

        result = json.loads(budget.to_json())
        result['id'] = result['_id']['$oid']
        result['start_date'] = result['start_date']['$date']
        result['end_date'] = result['end_date']['$date']
        del result['_id']

        return jsonify(result), 201
    except Exception as e:
        print(e)
        abort(400, "Problem creating budget: {}".format(e))


@app_views.route("/budgets/<budget_id>", methods=["GET"])
@token_required
def view_single_budget(budget_id: str = None) -> Response:
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

    result = json.loads(budget.to_json())
    result['start_date'] = result['start_date']['$date']
    result['end_date'] = result['end_date']['$date']
    del result['_id']

    return jsonify(result), 200


@app_views.route("/users/<user_id>/budgets", methods=["GET"])
@token_required
def view_budgets(budget_id: str = None) -> Response:
    """GET /api/v1/budgets/<budget_id>
    Gets all budgets related to a particular user
    Path params:
        - user_id
    Return:
        - Budget info in JSON
    """
    if user_id is None:
        abort(404)
    User = None
    user = User.objects(id=user_id).first()
    if user is None:
        abort(404)
    budgets = list(Budget.objects(user_id=user_id))
    result = json.loads(budgets.to_json())
    return jsonify(result), 200


@app_views.route("/budgets/<budget_id>", methods=["PUT"])
@token_required
def update_budget(budget_id: str = None) -> Response:
    """PUT /api/v1/budgets/<budget_id>
    Path params:
        - budget_id
    Form body:
        - user_id (optional)
        - name (optional)
        - limit (optional)
        - start_date (optional)
        - end_date (optional)
    Return:
        - Updated budget in JSON
        - 404 if the budget is not found
        - 400 if budget update fails
    """
    # Validate
    if budget_id is None:
        abort(404)
    budget = None
    try:
        budget = Budget.objects(id=budget_id).first()
    except Exception:
        abort(404)
    if budget is None:
        abort(404)
    payload = request.form

    # Update data
    try:
        if "name" in payload:
            budget.name = payload.get("name")
        if "limit" in payload:
            budget.limit = payload.get("limit")
        if "password" in payload:
            budget.password = hash_password(payload.get("password"))
        if "start_date" in payload:
            budget.birth_date = datetime.fromisoformat(
                payload.get("start_date")
            ).date()
        if "start_date" in payload:
            budget.birth_date = datetime.fromisoformat(
                payload.get("start_date")
            ).date()

        budget.save()
    except Exception as e:
        abort(400, "Budget update failed: {}".format(e))

    # return updated budget
    result = json.loads(budget.to_json())
    result['id'] = result['_id']['$oid']
    result['start_date'] = result['start_date']['$date']
    result['end_date'] = result['end_date']['$date']
    del result['_id']

    return jsonify(result)


@app_views.route("/budgets/<budget_id>", methods=["DELETE"])
@token_required
def delete_budget(budget_id: str = None) -> Response:
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
    budget.delete()
    return jsonify({}), 200