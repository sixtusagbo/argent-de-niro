#!/usr/bin/env python3
"""Entry point for the database"""

from mongoengine import register_connection
import mongomock
from api.models.user import User


def init_db():
    """Connect to MongoDB"""
    register_connection(alias="core", db="argent")


def test_connect():
    """Test the connection to MongoDB"""
    from mongoengine import connect

    connect(
        "mongoenginetest",
        host="mongodb://localhost",
        mongo_client_class=mongomock.MongoClient,
        alias="core",
        uuidRepresentation="standard",
    )


def test_disconnect():
    """Disconnect from MongoDB"""
    from mongoengine import disconnect

    disconnect()


def db_status():
    """Check the status of the database"""
    try:
        User.objects.first()
    except Exception:
        return False
    return True
