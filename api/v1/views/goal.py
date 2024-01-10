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
        abort(400, str(e))


@app_views.route("/goals", methods=["GET"])
@token_required
def get_goals(current_user: User) -> Response:
    """GET /api/v1/goals
    Retrieve all goals for a user

    Return:
        - 200 on success
        - 400 on error
    """
    try:
        goals = Goal.objects(user_id=current_user.id)
        return jsonify([goal.to_dict() for goal in goals])
    except Exception as e:
        abort(400, str(e))


@app_views.route("/goals/<goal_id>", methods=["GET"])
@token_required
def get_goal(current_user: User, goal_id: str) -> Response:
    """GET /api/v1/goals/<goal_id>
    Retrieve a goal by id

    Return:
        - 200 on success
        - 400 on error
    """
    try:
        goal = Goal.objects.get(id=goal_id)
        if not goal:
            abort(404)
        if goal.user_id != current_user.id:
            abort(403)
        return jsonify(goal.to_dict())
    except Exception as e:
        abort(400, str(e))


@app_views.route("/goals/<goal_id>", methods=["PUT"])
@token_required
def update_goal(current_user: User, goal_id: str) -> Response:
    """PUT /api/v1/goals/<goal_id>
    Update a goal by id

    Form body:
        - name (optional)
        - target (optional)
        - desired_date (optional)
        - status (optional)

    Return:
        - 200 on success
        - 400 on error
    """
    try:
        goal = Goal.objects.get(id=goal_id)
        if not goal:
            abort(404)
        if goal.user_id != current_user.id:
            abort(403)
        payload = request.form
        if "name" in payload:
            goal.name = payload["name"]
        if "target" in payload:
            goal.target = payload["target"]
        if "desired_date" in payload:
            goal.desired_date = payload["desired_date"]
        if "status" in payload:
            goal.status = payload["status"]
        goal.save()
        return jsonify(goal.to_dict())
    except Exception as e:
        abort(400, str(e))


@app_views.route("/goals/<goal_id>", methods=["DELETE"])
@token_required
def delete_goal(current_user: User, goal_id: str) -> Response:
    """DELETE /api/v1/goals/<goal_id>
    Delete a goal by id

    Return:
        - 200 on success
        - 400 on error
    """
    try:
        goal = Goal.objects.get(id=goal_id)
        if not goal:
            abort(404)
        if goal.user_id != current_user.id:
            abort(403)
        goal.delete()
        return jsonify({})
    except Exception as e:
        abort(400, str(e))
