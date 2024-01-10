#!/usr/bin/env python3
"""Feed the database with some data"""
from datetime import datetime
from api.models import init_db
from api.models.user import User
from api.v1.auth.passwords import hash_password
from api.models.transaction import Transaction
from api.models.category import Category
from api.models.budget import Budget
from api.models.goal import Goal
from random import randint
from datetime import timedelta
from random import choice
from os import getenv

TRANSACTION_COUNT_PER_USER = getenv("TRANSACTION_COUNT_PER_USER", 30)
BUDGET_COUNT_PER_USER = getenv("BUDGET_COUNT_PER_USER", 10)
GOAL_COUNT_PER_USER = getenv("GOAL_COUNT_PER_USER", 10)

init_db()

# Generate some users
sixtus = User()
sixtus.first_name = "Sixtus"
sixtus.last_name = "Agbo"
sixtus.email = "sixtus@gmail.com"
sixtus.password = hash_password("password")
sixtus.birth_date = datetime.now().date()
sixtus.save()

liz = User()
liz.first_name = "Elizabeth"
liz.last_name = "Pfachi"
liz.email = "liz@gmail.com"
liz.password = hash_password("password")
liz.birth_date = datetime.now().date()
liz.save()

andy = User()
andy.first_name = "Andrea"
andy.last_name = "Ozuem"
andy.email = "andy@gmail.com"
andy.password = hash_password("password")
andy.birth_date = datetime.now().date()
andy.save()

# Generate some categories
categories = [
    "Food",
    "Clothing",
    "Transportation",
    "Rent",
    "Utilities",
    "Entertainment",
    "Health",
    "Education",
    "Gifts",
    "Other",
]

for category in categories:
    c = Category()
    c.name = category
    c.save()

# Generate some budgets
for i in range(1, BUDGET_COUNT_PER_USER):
    b = Budget()
    b.user_id = sixtus.id
    b.category_id = choice(Category.objects().all()).id
    b.amount = randint(1, 10000)
    b.name = "Budget {}".format(i)
    b.limit = randint(10000, 50000)
    b.end_date = datetime.now().date() + timedelta(days=i)
    b.save()

for i in range(1, BUDGET_COUNT_PER_USER):
    b = Budget()
    b.user_id = liz.id
    b.category_id = choice(Category.objects().all()).id
    b.amount = randint(1, 10000)
    b.name = "Budget {}".format(i)
    b.limit = randint(10000, 50000)
    b.end_date = datetime.now().date() + timedelta(days=i)
    b.save()

for i in range(1, BUDGET_COUNT_PER_USER):
    b = Budget()
    b.user_id = andy.id
    b.category_id = choice(Category.objects().all()).id
    b.amount = randint(1, 10000)
    b.name = "Budget {}".format(i)
    b.limit = randint(10000, 50000)
    b.end_date = datetime.now().date() + timedelta(days=i)
    b.save()

# Generate some goals
for i in range(1, GOAL_COUNT_PER_USER):
    g = Goal()
    g.user_id = sixtus.id
    g.name = "Goal {}".format(i)
    g.target = randint(1, 10000)
    g.current = randint(1, 1000)
    g.desired_date = datetime.now().date() + timedelta(days=i)
    g.save()

for i in range(1, GOAL_COUNT_PER_USER):
    g = Goal()
    g.user_id = liz.id
    g.name = "Goal {}".format(i)
    g.target = randint(1, 10000)
    g.current = randint(1, 1000)
    g.desired_date = datetime.now().date() + timedelta(days=i)
    g.save()

for i in range(1, GOAL_COUNT_PER_USER):
    g = Goal()
    g.user_id = andy.id
    g.name = "Goal {}".format(i)
    g.target = randint(1, 10000)
    g.current = randint(1, 1000)
    g.desired_date = datetime.now().date() + timedelta(days=i)
    g.save()

# Generate some transactions
for i in range(1, TRANSACTION_COUNT_PER_USER):
    t = Transaction()
    t.user_id = sixtus.id
    t.category_id = choice(Category.objects().all()).id
    t.budget_id = choice(Budget.objects(user_id=sixtus.id).all()).id
    t.goal_id = choice(Goal.objects(user_id=sixtus.id).all()).id
    t.type = choice(["income", "expense"])
    t.amount = randint(1, 10000)
    t.date = datetime.now().date() - timedelta(days=i)
    t.description = "Transaction {}".format(i)
    t.save()

for i in range(1, TRANSACTION_COUNT_PER_USER):
    t = Transaction()
    t.user_id = liz.id
    t.category_id = choice(Category.objects().all()).id
    t.budget_id = choice(Budget.objects(user_id=liz.id).all()).id
    t.goal_id = choice(Goal.objects(user_id=liz.id).all()).id
    t.type = choice(["income", "expense"])
    t.amount = randint(1, 10000)
    t.date = datetime.now().date() - timedelta(days=i)
    t.description = "Transaction {}".format(i)
    t.save()

for i in range(1, TRANSACTION_COUNT_PER_USER):
    t = Transaction()
    t.user_id = andy.id
    t.category_id = choice(Category.objects().all()).id
    t.budget_id = choice(Budget.objects(user_id=andy.id).all()).id
    t.goal_id = choice(Goal.objects(user_id=andy.id).all()).id
    t.type = choice(["income", "expense"])
    t.amount = randint(1, 10000)
    t.date = datetime.now().date() - timedelta(days=i)
    t.description = "Transaction {}".format(i)
    t.save()
