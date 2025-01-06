from django.urls import path
from django.views.generic import TemplateView

app_name = 'diary'

urlpatterns = [
    path('', TemplateView.as_view(template_name="diary/index.html")),
]