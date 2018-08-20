from django.conf.urls import url
from django.urls import path

from rest_framework.routers import SimpleRouter

from .views import TaskView, TasksListView

router = SimpleRouter(trailing_slash=False)
router.register(r'tasks', TaskView)

urlpatterns = [
    path('tasks/clear', TasksListView.as_view({'delete': 'clear_all'}), name='clear-all')
]

urlpatterns += router.urls
