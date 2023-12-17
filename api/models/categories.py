#!/usr/bin/env python3
"""Categories model"""
from mongoengine import Document, StringField


class Category(Document):
    """Defines a Category"""

    name = StringField(required=True)
