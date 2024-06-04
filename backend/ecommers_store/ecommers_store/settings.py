import os
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'django-insecure-gdc*m943k+#mbb5=%kla0n&8509=jz=abr$g35ugve%_1)3)@1'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'debug_toolbar',
    'corsheaders',
    'store_app',
    'rest_framework',
    'rest_framework_simplejwt',
]

AUTH_USER_MODEL = 'store_app.UserProfile'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True

# або, для більш конкретних налаштувань:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Замініть на домен вашого фронтенду
    "http://127.0.0.1:3000",
]

ROOT_URLCONF = 'ecommers_store.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'ecommers_store.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#         'file': {
#             'level': 'DEBUG',
#             'class': 'logging.FileHandler',
#             'filename': os.path.join(BASE_DIR, 'debug.log'),
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'file'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }

INTERNAL_IPS = [
    # ...
    '127.0.0.1',
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# URL для медіафайлів
MEDIA_URL = '/media/'
# Директорія для збереження медіафайлів
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# URL для статичних файлів
STATIC_URL = '/static/'
# Директорія для збереження статичних файлів
STATIC_ROOT = os.path.join(BASE_DIR, 'static')