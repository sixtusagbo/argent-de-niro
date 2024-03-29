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
from bson import json_util
import json


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

    def to_json(self):
        """Converts a Budget instance to JSON"""
        data = self.to_mongo().to_dict()
        if "_id" in data:
            data["id"] = str(data["_id"])
            del data["_id"]
        data["category_id"] = str(data["category_id"])
        data["user_id"] = str(data["user_id"])

        # Convert datetime fields to string
        if "start_date" in data:
            data["start_date"] = data["start_date"].isoformat()
        data["end_date"] = data["end_date"].isoformat()

        return json_util.dumps(data)  # Convert to JSON

    def to_dict(self):
        """Converts this model to a python dictionary"""
        return json.loads(self.to_json())
