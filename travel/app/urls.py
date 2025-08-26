from django.urls import path
from .views import verify_password,get_csrf_token,create_account,verify,log_out

urlpatterns =[
   
    path('create_acc/',create_account,name= 'create_acc'),
    path('login/',verify_password,name='password'),
    path('csrf/',get_csrf_token),
    path('verify/',verify,name="verify"),
    path('logout/',log_out,name='logout')
]