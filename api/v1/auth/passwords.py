#!/usr/bin/env python3
"""
Encrypts passwords and verifies password hashes.
"""
import bcrypt
import base64


def hash_password(password: str) -> str:
    """Return a salted, hashed password"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return base64.b64encode(hashed).decode('utf-8')


def is_valid(hashed_password: str, password: str) -> bool:
    """Verify that hashed_password matches given password"""
    hashed_password_bytes = base64.b64decode(hashed_password.encode('utf-8'))
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password_bytes)
