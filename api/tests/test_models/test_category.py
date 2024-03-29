import unittest
from api.models import test_connect, test_disconnect
from api.models.category import Category
from mongoengine.errors import ValidationError
from api.tests import test_category


class TestCategory(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        test_connect()

    @classmethod
    def tearDownClass(cls):
        test_disconnect()

    def setUp(self):
        self.category = Category(**test_category)
        self.category.save()

    def tearDown(self):
        Category.objects().delete()

    def test_required_fields(self):
        with self.assertRaises(ValidationError):
            Category().save()

    def test_to_json(self):
        json_data = self.category.to_json()
        self.assertIsInstance(json_data, str)

    def test_to_dict(self):
        dict_data = self.category.to_dict()
        self.assertIsInstance(dict_data, dict)
        self.assertEqual(dict_data["name"], "Food")


if __name__ == "__main__":
    unittest.main()
