#!/usr/bin/env python3
"""Goal model"""

from datetime import datetime
from enum import Enum
from mongoengine import (
    DateField,
    DecimalField,
    Document,
    EnumField,
    ObjectIdField,
    StringField,
)
from bson import json_util
import json


class GoalStatus(Enum):
    ACTIVE = "active"
    REACHED = "reached"


class Goal(Document):
    """Define a user's Goal"""

    user_id = ObjectIdField(required=True)
    name = StringField(required=True)
    target = DecimalField(required=True)
    current = DecimalField(default=0.00)
    desired_date = DateField(required=True)
    start_date = DateField(default=datetime.now())
    status = EnumField(GoalStatus, default=GoalStatus.ACTIVE)

    meta = {
        "db_alias": "core",
        "collection": "goals",
    }

    def to_json(self):
        """Converts a Goal instance to JSON"""
        if self.desired_date < datetime.now().date():
            self.status = GoalStatus.REACHED
            self.save()
        data = self.to_mongo().to_dict()
        data["id"] = str(data["_id"])  # Convert ObjectId to string
        data["user_id"] = str(data["user_id"])  # Convert ObjectId to string
        del data["_id"]

        # Convert date fields to string
        if "start_date" in data:
            data["start_date"] = data["start_date"].isoformat()
        data["desired_date"] = data["desired_date"].isoformat()

        return json_util.dumps(data)

    def to_dict(self):
        """Converts this model to a python dictionary"""
        return json.loads(self.to_json())
