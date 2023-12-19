#!/usr/bin/env python3
"""Entry point for the database"""
from mongoengine import register_connection


def init_db():
    """Connect to MongoDB"""
    register_connection(alias="core", db="argent")
