from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'  # Now users will log in with email
    REQUIRED_FIELDS = ['username']  # 'email' is required by default

    def __str__(self):
        return self.email