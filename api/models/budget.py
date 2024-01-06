#!/usr/bin/env python3
"""Budget model"""
from datetime import datetime
from mongoengine import (
    DateField,
    DecimalField,
    Document,
    ObjectIdField,
    StringField,
)


class Budget(Document):
    """Defines a Budget"""

    user_id = ObjectIdField(required=True)
    category_id = ObjectIdField(required=True)

    name = StringField(required=True)
    limit = DecimalField(required=True)
    start_date = DateField(default=datetime.utcnow())
    end_date = DateField(required=True)

    meta = {
        "db_alias": "core",
        "collection": "budgets",
    }
