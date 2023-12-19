"""
Authentication routes
"""
from datetime import datetime, timedelta
import json
from flask import abort, current_app, jsonify, request
import jwt
from api.models.users import User
from api.v1.auth.passwords import is_valid
from api.v1.views import app_views


@app_views.route("/login", methods=["POST"])
def login():
    """Return access and refresh tokens"""
    payload = request.get_json()
    if not payload:
        abort(400, "Not a JSON")
    if "email" not in payload:
        abort(400, "Missing email")
    if "password" not in payload:
        abort(400, "Missing password")
    user = User.objects(email=payload["email"]).first()
    if not user:
        abort(400, "Invalid email")
    if not is_valid(user.password, payload['password']):
        abort(400, 'Incorrect password')
    access_expiration = datetime.utcnow() + timedelta(hours=1)
    result = {}
    secret = current_app.config['SECRET_KEY']
    access_token = jwt.encode(
        {
            'email': user.email,
            'exp': access_expiration,
        },
        secret,
    )
    result['access_token'] = access_token.decode('utf-8')
    refresh_expiration = datetime.utcnow() + timedelta(days=1)
    refresh_token = jwt.encode(
        {
            'email': user.email,
            'exp': refresh_expiration,
        },
        secret,
    )
    result['user'] = json.loads(user.to_json())
    result['user']['id'] = result['user']['_id']['$oid']
    result['user']['birth_date'] = result['user']['birth_date']['$date']
    del result['user']['_id']
    del result['user']['password']

    response = jsonify(result)
    response.set_cookie(
        'refresh_token',
        refresh_token.decode('utf-8'),
        max_age=timedelta(days=1),
        httponly=True,
    )
    return response
