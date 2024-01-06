#!/usr/bin/env python3
"""Goal views"""
from api.v1.views import app_views
from api.v1.auth.middleware import token_required
from api.models.user import User
from api.models.goal import Goal
from flask import abort, jsonify, request, Response


@app_views.route("/goals", methods=["POST"])
@token_required
def create_goal(current_user: User) -> Response:
    """POST /api/v1/goals

    Form body:
        - name
        - target
        - start_date (optional)
        - desired_date

    Return:
        - 201 on success
        - 400 on error
    """
    payload = request.form
    if "name" not in payload:
        abort(400, "name is missing")
    if "target" not in payload:
        abort(400, "target is missing")
    if "desired_date" not in payload:
        abort(400, "desired_date is missing")
    try:
        goal = Goal(**payload)
        goal.user_id = current_user.id
        goal.save()
        return jsonify(goal.to_dict()), 201
    except Exception as e:
        abort(400, e)
