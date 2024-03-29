#!/usr/bin/env python3
"""Entry point for the database"""

from mongoengine import register_connection
import mongomock


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
