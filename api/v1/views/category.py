#!/usr/bin/env python3
"""This module contains Category views"""
from api.v1.views import app_views
from api.models.category import Category
from api.v1.auth.auth_middleware import token_required
from flask import request, jsonify, abort, Response
import json


@app_views.route("/categories", methods=["POST"])
@token_required
def create_category(_) -> Response:
    """POST /api/v1/categories
    Form body
        - name
    Return:
        - newly created category in JSON
        - 400 on parameter errors
    """
    payload = request.form
    if "name" not in payload:
        abort(400, "name is missing")
    name = payload.get("name")
    existing_category = Category.objects(name=name).first()
    if existing_category is not None:
        abort(400, "Category with name: {} already exists".format(name))
    try:
        category = Category()
        category.name = name
        category.save()

        result = json.loads(category.to_json())

        return jsonify(result), 201
    except Exception as e:
        abort(400, "Problem creating category: {}".format(e))


@app_views.route("/categories", methods=["GET"])
@token_required
def get_categories(_) -> Response:
    """GET /api/v1/categories
    Return:
        - all categories in JSON
    """
    categories = Category.objects()
    result = json.loads(categories.to_json())
    return jsonify(result)
