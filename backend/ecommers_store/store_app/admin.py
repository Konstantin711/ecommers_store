from django.contrib import admin
from .models import UserProfile, ItemType, ParentType, Item, ItemSizes, ItemColors


admin.site.register(UserProfile)
admin.site.register(ItemType)
admin.site.register(ParentType)
admin.site.register(Item)
admin.site.register(ItemSizes)
admin.site.register(ItemColors)
