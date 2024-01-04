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


class GoalStatus(Enum):
    ACTIVE = 'active'
    REACHED = 'reached'


class Goal(Document):
    """Define a user's Goal"""

    user_id = ObjectIdField(required=True)
    name = StringField(required=True)
    target = DecimalField(required=True)
    current = DecimalField(default=0.00)
    desired_date = DateField(required=True)
    start_date = DateField(default=datetime.utcnow())
    status = EnumField(GoalStatus, default=GoalStatus.ACTIVE)

    meta = {
        'db_alias': 'core',
        'collection': 'goals',
    }