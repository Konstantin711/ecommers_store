from django.db import models

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

import logging
logger = logging.getLogger('django')


class UserProfileManager(BaseUserManager):
    """Manager for User profiles"""

    def create_user(self, email, name, password=None):
        """Create a new User profile"""
        if not email: raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        """Create SU profile"""
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""

    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('admin', 'Admin'),
        ('superadmin', 'SuperAdmin'),
    )

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserProfileManager()

    # перевизначаемо поле по якому логіниться юзер, по дефолту це юзен нейм, а ми ставимо пошту
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email


class ItemType(models.Model):
    """Means t-shirt, dress, jeans ..."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=64)

    def __str__(self) -> str:
        return f"{self.title} - {self.slug}"
    
    
class ItemSubCategory(models.Model):
    """Means oversize, casual, fit ..."""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=64)

    def __str__(self) -> str:
        return f"{self.title} - {self.slug}"


class ParentType(models.Model):
    """Parent type, means for /men or /woman"""

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=64)

    def __str__(self) -> str:
        return f"{self.title} - {self.slug}"


class ItemSizes(models.Model):
    title = models.CharField(max_length=64, blank=True)
    value = models.CharField(max_length=64, blank=True)

    def __str__(self) -> str:
        return f'{self.title} - {self.value}'


class ItemColors(models.Model):
    title = models.CharField(max_length=64, blank=True)
    value = models.CharField(max_length=64, blank=True)
    color_hex = models.CharField(max_length=128, blank=True)

    def __str__(self) -> str:
        return f'{self.title} - {self.value}'


class Item(models.Model):
    """Clothes Item, where type_ means type of clothes"""
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=64)
    qty = models.IntegerField(blank=True)
    price = models.FloatField(blank=True)
    fake_price = models.FloatField(default=0.00, blank=True)
    description = models.TextField(blank=True, max_length=400)
    item_status = models.CharField(blank=True, max_length=40)

    # maybe it will be extracted to separate moder or changed to separate images
    images = models.ImageField(upload_to='images/', blank=True)
    item_care = models.CharField(max_length=255, blank=True)
    model_parameters = models.CharField(max_length=255, blank=True)
    seasons_use = models.CharField(max_length=255, blank=True)
    item_material = models.CharField(max_length=255, blank=True)
    # maybe it will be extracted too
    print_category = models.CharField(max_length=255, blank=True)

    parent_type = models.ForeignKey(ParentType, on_delete=models.CASCADE)
    category = models.ManyToManyField(ItemType)
    sub_category = models.ManyToManyField(ItemSubCategory)
    item_sizes = models.ManyToManyField(ItemSizes)
    item_colors = models.ManyToManyField(ItemColors)

    def __str__(self) -> str:
        return f"{self.title} - {self.slug} - {self.parent_type.title}"


class Orders(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    order_status = models.CharField(max_length=64, blank=True, default='new')
    order_sum = models.FloatField(blank=True, null=True)
    # order_id

    city = models.CharField(max_length=128, blank=True)
    department = models.CharField(max_length=128, blank=True)
    payment_type = models.CharField(max_length=32, blank=True)
    customer_name = models.CharField(max_length=64, blank=True)
    customer_surname = models.CharField(max_length=64, blank=True)
    customer_phone = models.CharField(max_length=16, blank=True)
    customer_post = models.CharField(max_length=128, blank=True)

    # ???
    ordered_items = models.JSONField(max_length=1024, blank=True)

    def __str__(self) -> str:
        return f'{self.created_at} - {self.city} {self.department}'