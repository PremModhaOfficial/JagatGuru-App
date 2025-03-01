from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

User = get_user_model()


class Habit(models.Model):

    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="habits"
    )
    name = models.CharField(max_length=50)

    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)

    desc = models.CharField(max_length=250)
    # TODO : calulate the streaks based on most recent break
    # streak = models.IntegerField()

    most_recent_break = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"
