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


class TransactionType(Enum):
    EXPENSE = 'expense'
    INCOME = 'income'


class Transaction(Document):
    """Defines a Transaction"""

    user_id = ObjectIdField(required=True)
    category_id = ObjectIdField()

    type = EnumField(TransactionType, default=TransactionType.EXPENSE)
    amount = DecimalField(required=True)
    date = DateTimeField(default=datetime.utcnow())
    description = StringField()
