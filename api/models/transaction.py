#!/usr/bin/env python3
"""Transaction model"""
from datetime import datetime
from mongoengine import (
    DateTimeField,
    DecimalField,
    Document,
    EnumField,
    ObjectIdField,
    StringField,
)
from enum import Enum
from bson import json_util
import json


class TransactionType(Enum):
    EXPENSE = "expense"
    INCOME = "income"


class Transaction(Document):
    """Defines a Transaction"""

    user_id = ObjectIdField(required=True)
    category_id = ObjectIdField()
    budget_id = ObjectIdField()
    goal_id = ObjectIdField()

    type = EnumField(TransactionType, default=TransactionType.EXPENSE)
    amount = DecimalField(required=True)
    date = DateTimeField(default=datetime.utcnow())
    description = StringField()

    meta = {
        "db_alias": "core",
        "collection": "transactions",
    }

    def to_json(self):
        """Converts a Transaction instance to JSON"""
        data = self.to_mongo().to_dict()
        data["id"] = str(data["_id"])
        del data["_id"]
        data["user_id"] = str(data["user_id"])
        data["category_id"] = str(data["category_id"])
        data["budget_id"] = str(data["budget_id"])
        data["goal_id"] = str(data["goal_id"])

        # Convert datetime fields to string
        if "date" in data:
            data["date"] = data["date"].isoformat()

        return json_util.dumps(data)

    def to_dict(self):
        """Converts this model to a python dictionary"""
        return json.loads(self.to_json())
