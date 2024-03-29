#!/usr/bin/python3
"""User model tests"""

import unittest
from api.models import test_connect, test_disconnect
from api.models.user import User
from mongoengine.errors import ValidationError, NotUniqueError
from api.tests import test_user


class TestUser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        test_connect()

    @classmethod
    def tearDownClass(cls):
        test_disconnect()

    def setUp(self):
        self.user = test_user
        self.user.save()

    def tearDown(self):
        User.objects().delete()

    def test_to_json(self):
        json_data = self.user.to_json()
        self.assertIsInstance(json_data, str)

    def test_to_dict(self):
        dict_data = self.user.to_dict()
        self.assertIsInstance(dict_data, dict)
        self.assertEqual(dict_data["first_name"], "John")
        self.assertEqual(dict_data["last_name"], "Doe")
        self.assertEqual(dict_data["email"], "john.doe@example.com")

    def test_required_fields(self):
        with self.assertRaises(ValidationError):
            User().save()

    def test_unique_email(self):
        with self.assertRaises(NotUniqueError):
            foo = User(
                first_name="Liz",
                last_name="Andy",
                password="password",
                email="foo@example.com",
                birth_date=self.user.birth_date,
            )
            foo.save()
            bar = User(
                first_name="Bar",
                last_name="Baz",
                password="password",
                email="foo@example.com",
                birth_date=self.user.birth_date,
            )
            bar.save()

    def test_password_exclusion(self):
        json_data = self.user.to_json()
        dict_data = self.user.to_dict()
        self.assertNotIn("password", json_data)
        self.assertNotIn("password", dict_data)


if __name__ == "__main__":
    unittest.main()
