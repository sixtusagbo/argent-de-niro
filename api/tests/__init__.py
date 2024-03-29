#!/usr/bin/python3
"""Initialize the tests package"""

from datetime import datetime
from api.models.user import User

# Constants for tests
test_user = User(
    first_name="John",
    last_name="Doe",
    password="password",
    email="john.doe@example.com",
    birth_date=datetime.now(),
)
