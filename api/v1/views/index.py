#!/usr/bin/env python3
"""
Index views
"""
import json
from flask import Response, jsonify
from api.models.users import User
from api.v1.views import app_views


@app_views.route("/status", methods=["GET"])
def status() -> Response:
    """GET api/v1/status
    Return:
        - the status of the API
    """
    return jsonify({"status": "OK"})


@app_views.route("/stats", methods=["GET"])
def statistics() -> Response:
    """GET api/v1/stats
    Return:
        - some db statistics
    """
    # TODO: List out all collections and a find()
    stats = {}
    stats["collections"] = 1
    stats['users'] = [json.loads(u.to_json()) for u in User.objects]
    return jsonify(stats)
