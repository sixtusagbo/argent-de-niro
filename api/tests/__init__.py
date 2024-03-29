#!/usr/bin/python3
"""Initialize the tests package"""

from datetime import datetime
from api.models.budget import Budget
from api.models.category import Category
from api.models.user import User

# Constants for tests
test_user = User(
    first_name="John",
    last_name="Doe",
    password="password",
    email="john.doe@example.com",
    birth_date=datetime.now(),
)

test_category = Category(name="Food")

test_budget = Budget(
    name="Groceries",
    limit=200.00,
    start_date=datetime.now(),
    end_date=datetime.now(),
)
