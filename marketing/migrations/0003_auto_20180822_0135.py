# Generated by Django 2.0.7 on 2018-08-22 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0002_marketingpreference_mailchimp_subscribed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='marketingpreference',
            old_name='update',
            new_name='updated',
        ),
    ]
