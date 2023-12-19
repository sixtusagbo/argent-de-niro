#!/usr/bin/env python3
"""Feed the database with some data"""
from datetime import datetime
from api.models import init_db
from api.models.users import User
from api.v1.auth.passwords import hash_password


init_db()

sixtus = User()
sixtus.first_name = 'Sixtus'
sixtus.last_name = 'Agbo'
sixtus.email = 'sixtus@gmail.com'
sixtus.password = hash_password('password')
print(sixtus.password)
sixtus.birth_date = datetime.now().date()
sixtus.save()

liz = User()
liz.first_name = 'Elizabeth'
liz.last_name = 'Pfachi'
liz.email = 'liz@gmail.com'
liz.password = hash_password('password')
liz.birth_date = datetime.now().date()
liz.save()

andy = User()
andy.first_name = 'Andrea'
andy.last_name = 'Ozuem'
andy.email = 'andy@gmail.com'
andy.password = hash_password('password')
andy.birth_date = datetime.now().date()
andy.save()
