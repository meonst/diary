from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from diary.models import Post, Category
from django.contrib.auth.models import User

class PostTests(APITestCase):

    def test_view_posts(self):
        url = reverse('diary_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def create_post(self):
        self.test_category = Category.objects.create(name='test_category')
        self.test_user = User.objects.create_user(
            username='test_user', password='1234567'
        )
        
        data = {"title": "test title", "author": 1, "excerpt": "test excerpt", "content": "test concept"}

        url = reverse('diary_api:listcreate')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)