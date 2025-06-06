import requests
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        return JsonResponse({'message': 'This endpoint should be handled by Flask, not Django'})
    return JsonResponse({'error': 'Method not allowed'},status=405)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        # token['groups'] = user.groups.all()
        token['username'] = user.username
        token['role'] = user.role
        
        if user.role == 'DOCTOR' and hasattr(user, 'doctor_profile'):
            token['profile_id'] = user.doctor_profile.id
        elif user.role == 'PATIENT' and hasattr(user, 'patient_profile'):
            token['profile_id'] = user.patient_profile.id
        else:
            token['profile_id'] = None
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Sign up
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account Created Successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # Return users based on roles
    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.ADMIN:
            return User.objects.all()
        elif user.role == User.Role.DOCTOR:
            return User.objects.filter(role=User.Role.DOCTOR)
        return User.objects.filter(id=user.id)  # Patients see only themselves

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def doctors_by_department(request, department_id):
        try:
            department = Department.objects.get(id=department_id)
            doctors = DoctorProfile.objects.filter(department=department)
            serializer = DoctorProfileSerializer(doctors, many=True)
            return Response(serializer.data, status=200)
        except Department.DoesNotExist:
            return Response({"error": "Department not found"}, status=404)

class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.DOCTOR:
            return Appointment.objects.filter(doctor=user)
        elif user.role == User.Role.PATIENT:
            return Appointment.objects.filter(patient=user)
        return Appointment.objects.all()  # Default empty queryset
    
    @api_view(['GET'])
    def patient_appointments(request, patient_id=None):
        user = request.user

        # Admins can view any patient's appointments
        if user.role == User.Role.ADMIN:
            if patient_id:
                appointments = Appointment.objects.filter(patient_id=patient_id)
            else:
                return Response({"error": "Patient ID is required for admin access"}, status=400)

        # Doctors can only view appointments of their patients
        elif user.role == User.Role.DOCTOR:
            appointments = Appointment.objects.filter(doctor=user)

        # Patients can only view their own appointments
        elif user.role == User.Role.PATIENT:
            if patient_id and patient_id != user.id:
                return Response({"error": "You can only view your own appointments"}, status=403)
            appointments = Appointment.objects.filter(patient=user)

        else:
            return Response({"error": "Unauthorized access"}, status=403)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=200)

    

class PreVisitQuestionViewSet(viewsets.ModelViewSet):
    queryset = PreVisitQuestion.objects.all()
    serializer_class = PreVisitQuestionSerializer


class PreVisitReportViewSet(viewsets.ModelViewSet):
    queryset = PreVisitReport.objects.all()
    serializer_class = PreVisitReportSerializer
    permission_classes = [IsAuthenticated]
   
    lookup_field = 'appointment'  # this makes DRF use `appointment_id` as lookup

    def retrieve(self, request, appointment=None):
        try:
            report = PreVisitReport.objects.get(appointment__id=appointment)
            serializer = self.get_serializer(report)
            return Response(serializer.data)
        except PreVisitReport.DoesNotExist:
            return Response({"detail": "No report found for this appointment."}, status=404)
