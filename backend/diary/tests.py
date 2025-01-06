from django.test import TestCase
from django.contrib.auth.models import User
from diary.models import Post, Category

class Test_Create_Post(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_category_1 = Category.objects.create(name='test_category_1')
        test_user_1 = User.objects.create_user(
            username='test_user_1', password='1234567'
        )
        test_post_1 = Post.objects.create(
            category_id=1, title='Test Title 1', excerpt='Test Post Excerpt', content='Test Content', slug='Test Slug', author_id=1, status='published'
        )


    def test_blog_content(self):
        post = Post.postobjects.get(id=1)
        category = Category.objects.get(id=1)
        author = f'{post.author}'
        excerpt = f'{post.excerpt}'
        title = f'{post.title}'
        content = f'{post.content}'
        status = f'{post.status}'

        self.assertEqual(author, 'test_user_1')
        self.assertEqual(excerpt, 'Test Post Excerpt')
        self.assertEqual(title, 'Test Title 1')
        self.assertEqual(status, 'published')
        self.assertEqual(str(post), "Test Title 1")
        self.assertEqual(str(category), "test_category_1")

