from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from .models import UserProfile, ItemType, ParentType, Item, ItemSizes, ItemColors


class UserProfileAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'name', 'role', 'is_active', 'is_staff', 'is_superuser']
    list_filter = ['role', 'is_staff', 'is_superuser', 'is_active']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('name', 'role')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'role'),
        }),
    )
    
    search_fields = ['email', 'name']

    def save_model(self, request, obj, form, change):
        # Додаткова логіка для перевірки ролей
        if obj.role == 'customer':
            obj.is_staff = False
            obj.is_superuser = False
        elif obj.role == 'admin':
            obj.is_staff = True
            obj.is_superuser = False
        elif obj.role == 'superadmin':
            obj.is_staff = True
            obj.is_superuser = True

        super().save_model(request, obj, form, change)


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(ItemType)
admin.site.register(ParentType)
admin.site.register(Item)
admin.site.register(ItemSizes)
admin.site.register(ItemColors)
