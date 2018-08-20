from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Task
from .serializers import TaskSerializer


class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TasksListView(viewsets.ViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def clear_all(self, request: Request):
        self.queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
