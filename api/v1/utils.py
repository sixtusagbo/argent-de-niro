#!/usr/bin/env python3
"""This module contains some utility methods"""
from PIL import Image
from flask import abort, current_app
from secrets import token_hex
from werkzeug.datastructures import FileStorage
import os


def save_profile_pic(picture: FileStorage):
    """Save an image in the server and return the file name"""
    file_name = token_hex(8) + os.path.splitext(picture.filename)[1]
    root_path = current_app.root_path
    if not os.path.isdir(os.path.join(root_path, 'static')):
        os.mkdir(os.path.join(root_path, 'static'))
    if not os.path.isdir(os.path.join(root_path, 'static/profile_images')):
        os.mkdir(os.path.join(root_path, 'static/profile_images'))
    file_path = os.path.join(root_path, "static/profile_images", file_name)
    try:
        with Image.open(picture) as image:
            image.thumbnail((150, 150))
            image.save(file_path)
    except OSError:
        abort(400, "Could not save image")
    return file_name
