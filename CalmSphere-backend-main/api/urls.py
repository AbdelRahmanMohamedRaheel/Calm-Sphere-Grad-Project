from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from django.urls import path
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'doctors', DoctorProfileViewSet)
router.register(r'patients', PatientProfileViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'previsitquestions', PreVisitQuestionViewSet)
router.register(r'previsitreports', PreVisitReportViewSet)



urlpatterns = [
    path('', include(router.urls)),

    # Authentication jwt
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("signup/", RegisterView.as_view(), name="register"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Doctors Custom Requests
    path('doctors/department/<int:department_id>/', DoctorProfileViewSet.doctors_by_department, name='doctors-by-department'),
    path('api/get-csrf-token/', views.get_csrf_token, name='get_csrf_token'),
         


    # Appointements Custom Requests
    path('appointments/patient/<int:patient_id>/', AppointmentViewSet.patient_appointments, name='patient-appointments-admin'),

]