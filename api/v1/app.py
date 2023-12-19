#!/usr/bin/env python3
"""
Entry point for the REST API
"""
from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS
from api.v1.views import app_views
from api.models import init_db

app = Flask(__name__)
app.url_map.strict_slashes = False
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
init_db()


@app.errorhandler(401)
def unauthorized(e):
    return jsonify({"message": "Unauthorized"}), 401


@app.errorhandler(403)
def forbidden(e):
    return jsonify({"message": "Forbidden"}), 403


@app.errorhandler(404)
def not_found(e):
    return jsonify({"message": "Not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"message": "Server error"}), 500


if __name__ == '__main__':
    host = getenv('ADN_API_HOST', '0.0.0.0')
    port = getenv('ADN_API_PORT', 5000)
    app.run(host=host, port=port, debug=True)
