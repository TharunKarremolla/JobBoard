from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.


class Jobs(models.Model):
    title = models.CharField(max_length=100)
    description =  models.CharField(max_length=200)
    company =  models.CharField(max_length=100)
    salary =  models.IntegerField()
    location = models.CharField(max_length=100)
    posted_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name="job", default=1)

class Application(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_id")
    job = models.ForeignKey(Jobs,on_delete=models.CASCADE,related_name="job_id")
    applied_on = models.DateTimeField(auto_now_add=True)
    

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user')
    pic = models.ImageField(upload_to='profile_pics/',blank=True,null=True)
    bio = models.TextField(blank=True,null=True)


class Messages(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE,related_name='sender')
    receiver = models.ForeignKey(User,on_delete=models.CASCADE,related_name='receiver')
    message = models.CharField()

