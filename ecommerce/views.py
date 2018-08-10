from django.contrib.auth import authenticate, login, get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect

from .forms import ContactForm

def home_page(request):
    print(request.session.get("cart_id", "Unknown"))
    context = {
        "title": "Hello World!",
        "content": "Welcome to the Home Page",
    }
    if request.user.is_authenticated:
        context["premium_content"] =  "COOL!!!"
    return render(request, "home_page.html", context)

def about_page(request):
    context = {
        "title": "About Page",
        "content": "Welcome to the About Page"
    }
    return render(request, "home_page.html", context)

def contact_page(request):
    contact_form = ContactForm(request.POST or None)
    context = {
        "title": "Contact Page",
        "content": "Welcome to the Contact Page",
        "form": contact_form
    }
    if contact_form.is_valid():
        print(contact_form.cleaned_data)
    return render(request, "contact/view.html", context)