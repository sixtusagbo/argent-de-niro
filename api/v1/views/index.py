#!/usr/bin/env python3
"""
Index views
"""
from flask import Response, jsonify
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
    stats = {}
    stats["collections"] = 0
    return jsonify(stats)
