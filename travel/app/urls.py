from django.urls import path
from .views import display_Msgs,send_message,fetch_all_users,verify_password,get_csrf_token,create_account,verify,log_out,fetch_jobs,new_job,apply,upload_profile,appied_Jobs,addBio,fetch_user

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
    path('user/',fetch_user,name = "users"),
    path('upload/',upload_profile,name='upload'),
    path('addBio/',addBio,name='bio'),
    path('all_users/',fetch_all_users,name='all users'),
    path('send_message/',send_message,name='send_message'),
    
     path('display_Msgs/',display_Msgs,name='display_Msgs'),
    


]