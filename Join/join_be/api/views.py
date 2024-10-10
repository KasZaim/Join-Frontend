from rest_framework.response import Response
from .serializers import UserSerializer, ContactsSerializer, TasksSerializer
from rest_framework import mixins, generics, viewsets
from rest_framework.decorators import action
from join_be.models import Users,Contacts,Tasks

class UserViewSet(viewsets.ModelViewSet): #ModelViewSet
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['get'])
    def contacts(self, request, pk=None):
        user = self.get_object()
        contacts = Contacts.objects.filter(user=user)
        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)

class ContactsViewSet(viewsets.ModelViewSet): #ModelViewSet
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class TasksViewSet(viewsets.ModelViewSet): #ModelViewSet
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer