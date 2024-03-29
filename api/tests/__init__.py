#!/usr/bin/python3
"""Initialize the tests package"""

from datetime import datetime

# Constants for tests
test_user = {
    "first_name": "John",
    "last_name": "Doe",
    "password": "password",
    "email": "john.doe@example.com",
    "birth_date": datetime.now(),
}

test_category = {"name": "Food"}

test_budget = {
    "name": "Groceries",
    "limit": 200.00,
    "start_date": datetime.now(),
    "end_date": datetime.now(),
}

test_goal = {
    "name": "Save for a car",
    "target": 10000.00,
    "desired_date": datetime.now(),
}
