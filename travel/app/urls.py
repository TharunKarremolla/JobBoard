from django.urls import path
from .views import verify_password,get_csrf_token,create_account,verify,log_out,fetch_jobs,new_job,apply,upload_profile,appied_Jobs,fetch_user

urlpatterns =[
   
    path('create_acc/',create_account,name= 'create_acc'),
    path('login/',verify_password,name='password'),
    path('csrf/',get_csrf_token),
    path('verify/',verify,name="verify"),
    path('logout/',log_out,name='logout'),
    path('fetch_jobs/',fetch_jobs,name="jobs"),
    path('new_job/',new_job,name="new_job"),
    path('apply/',apply,name="apply"),
    path('applied/',appied_Jobs,name="applied"),
    path('users/',fetch_user,name = "users"),
    path('upload/',upload_profile,name='upload')
]