from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_GET
from django.db.models import Q
from django.contrib.auth import authenticate,login


import json
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse, HttpResponse

@csrf_protect
def create_account(request):
    
    if request.method == 'POST':
         
        try :
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            user = User.objects.create_user(username=username,email=email,password=password)
            user.save()
        except:
            return JsonResponse({"error": "Invalid JSON"}, status=400)


         
    return JsonResponse({'message': 'account created successfully'})

def Home(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated" : True,"username" : request.user.username})
    else:
        return JsonResponse({"authenticated" : False},status=401)
        
    

        


@csrf_protect
def verify_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # parse JSON body
            identifier = data.get("email")
            password = data.get("password")
        except:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        
        try:
            user = User.objects.get(Q(username = identifier) | Q(email = identifier))
            print("user",user)
            username = user.username
            
        except:
            return JsonResponse({"error": "user not found"}, status=400)
        

        user = authenticate(request,username = username,password = password)
        
        if user  is not None:
            login(request,user)
        else:
            return JsonResponse({'error' : 'invalid credentails'},status = 400 )

        # try :
        #     user = User.objects.get(Q(email=email) | Q(username = email))

        # except :
        #     return JsonResponse({'error' : 'invalid credentails'},status = 400 )
        

        

        if check_password(password, user.password):
            return JsonResponse({"message": "Login Successful"})
        else:
            return JsonResponse({"error": "Incorrect Password"}, status=400)

    return JsonResponse({"error": "Only POST allowed"}, status=405)


@require_GET
@ensure_csrf_cookie
def get_csrf_token(request):
    get_token(request)
    return  JsonResponse({"detail": "CSRF cookie set"})
  
