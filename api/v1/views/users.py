#!/usr/bin/env python3
"""This module contains Users views"""
from datetime import datetime
import json
from flask import Response, abort, jsonify, request
from api.models.user import User
from api.v1.auth.auth_middleware import token_required
from api.v1.auth.passwords import hash_password
from api.v1.utils import remove_file, save_profile_pic
from api.v1.views import app_views


@app_views.route("/users", methods=["POST"])
def create_user() -> Response:
    """POST /api/v1/users
    Form body:
        - first_name
        - last_name
        - email
        - password
        - birth_date
        - country (optional)
        - timezone (optional)
        - currency (optional)
    Files:
        - profile_pic (optional)
    Return:
        - newly created user in JSON
        - 400 on parameter errors
    """
    payload = request.form
    if "first_name" not in payload:
        abort(400, "first_name is missing")
    if "last_name" not in payload:
        abort(400, "last_name is missing")
    if "email" not in payload:
        abort(400, "email is missing")
    if "password" not in payload:
        abort(400, "password is missing")
    if "birth_date" not in payload:
        abort(400, "birth_date is missing")
    email = payload.get('email')
    existing_user = User.objects(email=email).first()
    if existing_user is not None:
        abort(400, "Email: {} already exists".format(email))
    try:
        user = User()
        user.first_name = payload.get("first_name")
        user.last_name = payload.get("last_name")
        user.email = email
        user.password = hash_password(payload.get("password"))
        user.birth_date = datetime.fromisoformat(
            payload.get('birth_date')
        ).date()
        # Setting the optional ones. If missing, defaults to None
        user.country = payload.get("country")
        user.timezone = payload.get("timezone")
        user.currency = payload.get("currency")
        if request.files['profile_pic'].filename != '':
            user.profile_pic = "{}static/profile_images/{}".format(
                request.host_url,
                save_profile_pic(request.files['profile_pic']),
            )
        user.save()

        result = json.loads(user.to_json())
        result['id'] = result['_id']['$oid']
        result['birth_date'] = result['birth_date']['$date']
        del result['_id']
        del result['password']

        return jsonify(result), 201
    except Exception as e:
        print(e)
        abort(400, "Problem creating user: {}".format(e))


@app_views.route("/users/<user_id>", methods=["GET"])
@token_required
def view_single_user(current_user: User, user_id: str = None) -> Response:
    """GET /api/v1/users/<user_id>
    Path params:
        - user_id
    Return:
        - User info in JSON
    """
    if user_id is None:
        abort(404)
    user = None
    if user_id == 'me':
        user = current_user
    else:
        user = User.objects(id=user_id).first()
    if user is None:
        abort(404)

    result = json.loads(user.to_json())
    result['id'] = result['_id']['$oid']
    result['birth_date'] = result['birth_date']['$date']
    del result['_id']
    del result['password']

    return jsonify(result)


@app_views.route("/users/<user_id>", methods=["PUT"])
@token_required
def update_user(current_user: User, user_id: str = None) -> Response:
    """PUT /api/v1/users/<user_id>
    Path params:
        - user_id
    Form body:
        - first_name (optional)
        - last_name (optional)
        - email (optional)
        - password (optional)
        - birth_date (optional)
        - country (optional)
        - timezone (optional)
        - currency (optional)
    Files:
        - profile_pic (optional)
    Return:
        - Updated user in JSON
        - 404 if the user is not found
        - 400 if user update fails
    """
    # Validate
    if user_id is None:
        abort(404)
    user = None
    if user_id == 'me':
        user = current_user
    else:
        try:
            user = User.objects(id=user_id).first()
        except Exception:
            abort(404)
    if user is None:
        abort(404)
    payload = request.form

    # Update data
    try:
        if "first_name" in payload:
            user.first_name = payload.get("first_name")
        if "last_name" in payload:
            user.last_name = payload.get("last_name")
        if "email" in payload:
            user.email = payload.get("email")
        if "password" in payload:
            user.password = hash_password(payload.get("password"))
        if "birth_date" in payload:
            user.birth_date = datetime.fromisoformat(
                payload.get("birth_date")
            ).date()
        if "country" in payload:
            user.country = payload.get("country")
        if "timezone" in payload:
            user.timezone = payload.get("timezone")
        if "currency" in payload:
            user.currency = payload.get("currency")
        if (
            request.files.get('profile_pic') is not None
            and request.files['profile_pic'].filename != ''
        ):
            old_pic = user.profile_pic.split('/')[-1]
            remove_file(old_pic, "static/profile_images")
            user.profile_pic = "{}static/profile_images/{}".format(
                request.host_url,
                save_profile_pic(request.files['profile_pic']),
            )

        user.save()
    except Exception as e:
        abort(400, "User update failed: {}".format(e))

    # return updated user
    result = json.loads(user.to_json())
    result['id'] = result['_id']['$oid']
    result['birth_date'] = result['birth_date']['$date']
    del result['_id']
    del result['password']

    return jsonify(result)
