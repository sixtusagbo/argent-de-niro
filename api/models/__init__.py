#!/usr/bin/env python3
"""Entry point for the database"""

from mongoengine import register_connection
from api.models.user import User


def init_db():
    """Connect to MongoDB"""
    register_connection(alias="core", db="argent")


def db_status():
    """Check the status of the database"""
    try:
        User.objects.first()
    except Exception:
        return False
    return True
