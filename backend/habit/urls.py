from django.urls import include, path

from .views import Habit_TarkgetAPI, HabitAPIVIEW

urlpatterns = [
    path("habit/", HabitAPIVIEW.as_view()),
    path("habit/<int:pk>/", Habit_TarkgetAPI.as_view()),
    # path("habit/<int:pk>", include("habits.urls")),
]
