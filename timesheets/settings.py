import os
import sys
from setup import DEBUG, SECRET_KEY, WEBPACK_LOADER

LOGIN_URL = '/'

INTERNAL_IPS = ['127.0.0.1']

ALLOWED_HOSTS = ['*']


# Static file directories.
BASE_DIR = 'C:\\Dev\\Timesheet'

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'django_extensions',
    'django_filters',
    'webpack_loader',
    'rest_framework',
    'database',
    'rest'
)

if DEBUG:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler'
            },
        },
        'loggers': {
            'django': {
                'handlers': ['console'],
                'propagate': True,
            },
            'rest': {
                'handlers': ['console'],
            },
            'database': {
                'handlers': ['console'],
            }
        },
    }
else:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format': '%(asctime)s %(levelname)s [%(name)s:%(lineno)s] %(module)s %(process)d %(thread)d %(message)s'
            }
        },
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler'
            },
            'gunicorn': {
                'level': 'DEBUG',
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': '/var/log/gunicorn.errors'
            }
        },
        'loggers': {
            'django': {
                'handlers': ['console', 'gunicorn'],
                'propagate': True,
            },
            'rest': {
                'handlers': ['console', 'gunicorn'],
            },
            'database': {
                'handlers': ['console', 'gunicorn'],
            },
            'gunicorn': {
                'level': 'DEBUG',
                'handlers': ['gunicorn'],
                'propagate': True,
            },
        }
    }


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgi_redis.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('localhost', 6379)],
        },
        'ROUTING': 'timesheets.routing.channel_routing'
    },
}

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    # CORS headers
    #'corsheaders.middleware.CorsMiddleware',
    #'django.middleware.common.CommonMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware'
)

ROOT_URLCONF = 'timesheets.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

TEMPLATE_DIRS = (
)

WSGI_APPLICATION = 'timesheets.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'timesheets_db',
        'USER': 'timesheets_db_user',
        'PASSWORD': 'timesheets_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
        }
    }


# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = 'C:\\Dev\\Timesheet\\frontend\\static'

MEDIA_URL = '/media/'
MEDIA_ROOT = 'C:\\Dev\\Timesheet\\frontend\\media'
