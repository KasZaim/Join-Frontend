# Generated by Django 5.1.1 on 2024-10-04 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('join_be', '0008_rename_name_contacts_firstname_contacts_lastname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contacts',
            old_name='email',
            new_name='mail',
        ),
        migrations.AddField(
            model_name='contacts',
            name='color',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]