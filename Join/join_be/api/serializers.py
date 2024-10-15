
from rest_framework import serializers
from join_be.models import Users, Contacts,Tasks
from rest_framework.reverse import reverse


class ContactsSerializer(serializers.ModelSerializer):
    contact_link = serializers.SerializerMethodField()
    class Meta:
        model = Contacts
        fields = ['id', 'firstname','lastname', 'mail', 'phone', 'initials', 'color','contact_link']
    
    def get_contact_link(self, obj):
        request = self.context.get('request')
        return reverse('contacts-detail', kwargs={'pk': obj.pk}, request=request)


class UserSerializer(serializers.ModelSerializer):
    contacts = ContactsSerializer(many=True, read_only=True)
    class Meta:
        model = Users
        fields = '__all__'


class TasksSerializer(serializers.ModelSerializer):
    # date = serializers.DateTimeField(format="%d/%m/%Y", read_only=True)
    task_link = serializers.SerializerMethodField()
    class Meta:
        model = Tasks
        fields = ['id','category', 'topic', 'headline', 'description', 'clients', 'prio', 'date', 'subtasks','task_link']
    
    def get_subtasks(self, obj):
        subtasks = obj.subtasks.all()
        return TasksSerializer(subtasks, many=True).data
    
    def get_task_link(self, obj):
        request = self.context.get('request')
        return reverse('tasks-detail', kwargs={'pk': obj.pk}, request=request)
