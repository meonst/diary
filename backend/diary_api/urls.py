from django.urls import path
from django.views.generic import TemplateView
from .views import PostList, PostDetail

app_name = 'diary_api'

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate')
]