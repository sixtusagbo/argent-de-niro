#!/usr/bin/env python3
"""
Index views
"""

import json
from flask import Response, jsonify
from api.models import db_status
from api.models.user import User
from api.models.budget import Budget
from api.v1.views import app_views
from api.models.category import Category
from api.models.goal import Goal
from api.models.transaction import Transaction


@app_views.route("/status", methods=["GET"])
def status() -> Response:
    """GET api/v1/status
    Return:
        - the status of the API
    """
    # Check if MongoDB is running
    if not db_status():
        return jsonify(
            {"status": "Error", "error": "Database is not running"}
        ), 500
    return jsonify({"status": "OK"})


@app_views.route("/stats", methods=["GET"])
def statistics() -> Response:
    """GET api/v1/stats
    Return:
        - some db statistics
    """
    stats = {}
    stats["users"] = [json.loads(u.to_json()) for u in User.objects]
    stats["budgets"] = [json.loads(b.to_json()) for b in Budget.objects]
    stats["categories"] = [c.to_dict() for c in Category.objects]
    stats["goals"] = [g.to_dict() for g in Goal.objects]
    stats["transactions"] = [t.to_dict() for t in Transaction.objects]
    return jsonify(stats)
