import unittest
from api.models import test_connect, test_disconnect
from api.models.goal import Goal, GoalStatus
from mongoengine.errors import ValidationError
from datetime import datetime, timedelta
from api.models.user import User
from api.tests import test_goal, test_user


class TestGoal(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        test_connect()

    @classmethod
    def tearDownClass(cls):
        test_disconnect()

    def setUp(self):
        self.goal = Goal(**test_goal)
        self.user = User(**test_user)
        self.user.save()
        self.goal.user_id = self.user.id
        self.goal.save()

    def tearDown(self):
        User.objects().delete()
        Goal.objects().delete()

    def test_required_fields(self):
        with self.assertRaises(ValidationError):
            Goal().save()

    def test_to_json(self):
        json_data = self.goal.to_json()
        self.assertIsInstance(json_data, str)

    def test_to_dict(self):
        dict_data = self.goal.to_dict()
        self.assertIsInstance(dict_data, dict)
        self.assertEqual(dict_data["name"], "Save for a car")
        self.assertEqual(dict_data["target"], 10000.00)
        self.assertEqual(dict_data["current"], 0.00)
        self.assertEqual(dict_data["status"], GoalStatus.ACTIVE.value)

    def test_status_update(self):
        self.goal.desired_date = (datetime.now() - timedelta(days=1)).date()
        self.goal.save()
        dict_data = self.goal.to_dict()
        self.assertEqual(dict_data["status"], GoalStatus.REACHED.value)


if __name__ == "__main__":
    unittest.main()
