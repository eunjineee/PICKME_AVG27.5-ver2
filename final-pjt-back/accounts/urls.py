from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('profile/search/<int:user_pk>/', views.usersearch,),
    path('profile/<str:username>/', views.profile_or_edit, name='profile'),
    path('<str:username>/follow/', views.follow, name='follow'),
    path('users/', views.users, name='users'),
    path('kakao/login/finish/', views.KakaoLogin.as_view() ,name='kakao_login_todjango'),
    path('kakao/login/', views.kakao_login, name='kakao_login'),
    path('kakao/logout/', views.kakao_logout, name='kakao_logout'),
    path('kakao/callback/', views.kakao_callback, name='kakao_callback'),
]