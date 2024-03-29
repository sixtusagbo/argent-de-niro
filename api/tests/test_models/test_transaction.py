import unittest
from api.models import test_connect, test_disconnect
from api.models.transaction import Transaction, TransactionType
from mongoengine.errors import ValidationError
from api.models.user import User
from api.tests import test_transaction, test_user


class TestTransaction(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        test_connect()

    @classmethod
    def tearDownClass(cls):
        test_disconnect()

    def setUp(self):
        self.transaction = Transaction(**test_transaction)
        self.user = User(**test_user)
        self.user.save()
        self.transaction.user_id = self.user.id
        self.transaction.save()

    def tearDown(self):
        User.objects().delete()
        Transaction.objects().delete()

    def test_required_fields(self):
        with self.assertRaises(ValidationError):
            Transaction().save()

    def test_to_json(self):
        json_data = self.transaction.to_json()
        self.assertIsInstance(json_data, str)

    def test_to_dict(self):
        dict_data = self.transaction.to_dict()
        self.assertIsInstance(dict_data, dict)
        self.assertEqual(dict_data["type"], TransactionType.EXPENSE.value)
        self.assertEqual(dict_data["amount"], 50)

    def test_default_date(self):
        transaction = Transaction(
            user_id=self.user.id,
            amount=10.00,
            description="Bar Baz",
        )
        self.assertIsNotNone(transaction.date)

    def test_default_type(self):
        transaction = Transaction(
            user_id=self.user.id,
            amount=20.00,
            description="Foo Bar",
        )
        self.assertEqual(transaction.type, TransactionType.EXPENSE)


if __name__ == "__main__":
    unittest.main()
