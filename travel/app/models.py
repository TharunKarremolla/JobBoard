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
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user")
    job = models.ForeignKey(Jobs,on_delete=models.CASCADE,related_name="job")
    applied_on = models.DateTimeField(auto_now_add=True)

    
