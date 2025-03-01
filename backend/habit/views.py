# Create your views here.
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Habit
from .serializer import HabitSerializer


class HabitAPIVIEW(ListCreateAPIView):
    serializer_class = HabitSerializer
    queryset = Habit.objects.all()


class Habit_TarkgetAPI(RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer
    queryset = Habit.objects.all()
    lookup_fields = ["user"]
