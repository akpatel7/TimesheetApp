from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class ErrorMessage:
    '''Mixin for human readable error messages.'''

    def error_message(self):
        '''Returns a human readable error message.'''

        print 'ERRORS:', self.errors.as_data()
        field = self.errors.as_data().keys()[0]
        reason = self.errors.as_data()[field][0][0]

        return '{}: {}'.format(
            field.replace('_', ' '), reason
        )


class RegisterForm(UserCreationForm, ErrorMessage):
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')


class UserForm(forms.ModelForm, ErrorMessage):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')
