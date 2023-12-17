#!/usr/bin/env python3
"""User model"""
from mongoengine import DateField, Document, StringField


class User(Document):
    """Defines a User"""

    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = StringField(required=True)
    birth_date = DateField(required=True)
    profile_pic = StringField()
    country = StringField()
    timezone = StringField()
    currency = StringField()

    meta = {
        'db_alias': 'core',
        'collection': 'users',
    }
