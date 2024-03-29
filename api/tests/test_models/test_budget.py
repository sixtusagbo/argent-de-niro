import unittest
from api.models.budget import Budget
from api.models import test_connect, test_disconnect
from datetime import datetime
from api.models.category import Category
from api.models.user import User
from api.tests import test_budget, test_user, test_category
from mongoengine.errors import ValidationError


class TestBudget(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        test_connect()

    @classmethod
    def tearDownClass(cls):
        test_disconnect()

    def setUp(self):
        self.budget = test_budget
        self.user = test_user
        self.category = test_category
        self.user.save()
        self.category.save()
        self.budget.user_id = self.user.id
        self.budget.category_id = self.category.id
        self.budget.save()

    def tearDown(self):
        User.objects().delete()
        Category.objects().delete()
        Budget.objects().delete()

    def test_required_fields(self):
        with self.assertRaises(ValidationError):
            Budget().save()

    def test_to_json(self):
        json_data = self.budget.to_json()
        self.assertIsInstance(json_data, str)

    def test_to_dict(self):
        dict_data = self.budget.to_dict()
        self.assertIsInstance(dict_data, dict)
        self.assertEqual(dict_data["name"], "Groceries")
        self.assertEqual(dict_data["limit"], 200.00)

    def test_start_date_default(self):
        budget = Budget(
            user_id=self.budget.user_id,
            category_id=self.budget.category_id,
            name="Groceries",
            limit=200.00,
            end_date=datetime.now(),
        )
        self.assertIsNotNone(budget.start_date)


if __name__ == "__main__":
    unittest.main()
