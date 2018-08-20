from django.test import Client
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task
from .serializers import TaskSerializer


# Initialize the API client

class TaskTestCase(APITestCase):

    def setUp(self):
        self.client = Client()
        self.url_list = reverse('task-list')
        self.url_details = reverse('task-list')

    def test_create_task(self):
        """
        Create new task object
        """
        url = reverse('task-list')
        data = {'name': 'Send mail to John'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, TaskSerializer(Task.objects.first()).data)

    def test_get_task_list(self):
        """
        Get tasks list
        """
        url = reverse('task-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_delete_task(self):
        """
        Delete task object
        """
        url = reverse('task-list')
        data = {'name': 'Send mail to John'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.get().name, 'Send mail to John')

        url = reverse('task-detail', args=[response.data['id']])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_clear_all(self):
        response = self.client.post(reverse('task-list'), {'name': 'Send mail to John'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, TaskSerializer(Task.objects.first()).data)

        response = self.client.get(reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        response = self.client.delete('/api/v1/tasks/clear')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.get(reverse('task-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
