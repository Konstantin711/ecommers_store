from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# USER SERIALIZER START

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['email', 'name', 'is_active', 'is_staff', 'objects']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    class Meta:
        model = UserProfile
        fields = ['email', 'name', 'is_active', 'is_staff', 'is_superuser', 'objects']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# USER SERIALIZER END


class ItemTypeSerializer(serializers.ModelSerializer):
    """Serializer for ItemType"""

    class Meta:
        model = ItemType
        fields = ['title', 'slug']


class ParentTypeSerializer(serializers.ModelSerializer):
    """Serializer for ParentType"""

    class Meta:
        model = ParentType
        fields = ['title', 'slug']


class SizesSerializer(serializers.ModelSerializer):
    """Serializer for ParentType"""

    class Meta:
        model = ItemSizes
        fields = ['title', 'value']


class ColorsSerializer(serializers.ModelSerializer):
    """Serializer for ParentType"""

    class Meta:
        model = ItemColors
        fields = ['title', 'value', 'color_hex']


class ItemSerializer(serializers.ModelSerializer):
    """Serializer for Item with relations"""

    parent_type = ParentTypeSerializer()
    category = ItemTypeSerializer(many=True)
    item_sizes = SizesSerializer(many=True)
    item_colors = ColorsSerializer(many=True)

    images = serializers.ImageField()

    class Meta:
        model = Item
        fields = [
            'title',
            'slug',
            'qty',
            'price',
            'fake_price',
            'description',
            'images',
            'item_care',
            'model_parameters',
            'seasons_use',
            'item_material',
            'print_category',
            'parent_type',
            'category',
            'item_sizes',
            'item_colors',
        ]


    def create(self, validated_data):

        print(validated_data, 'validated_data')

        parent_type_data = validated_data.pop('parent_type')
        # if parent_type_data[0] =='women':
        #     parent_type_data = {
        #         "title": "жіночі",
        #         "slug": "women"
        #     }
        # else:
        #     parent_type_data = {
        #         "title": "чоловічі",
        #         "slug": "men"
        #     }

        item_type_data = validated_data.pop('category')
        # if item_type_data[0] == 'thirts':
        #     item_type_data = {
        #             "title": "футболки",
        #             "slug": "thirts"
        #         }

        item_sizes_data = validated_data.pop('item_sizes')
        # refactored_sizes = {}
        # for size in item_sizes_data:
        #     if size.lower() == 's':
        #         refactored_sizes.update({
        #             "title": "s",
        #             "value": "s"
        #         })
        #     elif size.lower() == 'm':
        #         refactored_sizes.update({
        #             "title": "m",
        #             "value": "m"
        #         })
        #     elif size.lower() == 'l':
        #         refactored_sizes.update({
        #             "title": "l",
        #             "value": "l"
        #         })
        #     elif size.lower() == 'xl':
        #         refactored_sizes.update({
        #             "title": "xl",
        #             "value": "xl"
        #         })
        # item_sizes_data = refactored_sizes

        item_colors_data = validated_data.pop('item_colors')
        # refactored_colors = {}
        # for color in item_colors_data:
        #     if color.lower() == '#ffffff':
        #         refactored_colors.update({
        #             "title": "білий",
        #             "value": "white",
        #             "color_hash": "#FFFFFF"
        #         })
        #     elif color.lower() == '#000000':
        #         refactored_colors.update({
        #             "title": "чорний",
        #             "value": "black",
        #             "color_hash": "#000000"
        #         })
        # item_colors_data = refactored_colors

        # Створюємо екземпляр батьківського типу
        parent_type = ParentType.objects.get_or_create(**parent_type_data)[0]
        # Створюємо екземпляр типу елементу
        item_type_objs = [ItemType.objects.get_or_create(**item_data)[0] for item_data in item_type_data]
        item_sizes_objs = [ItemSizes.objects.get_or_create(**item_size)[0] for item_size in item_sizes_data]
        item_colors_objs = [ItemColors.objects.get_or_create(**item_color)[0] for item_color in item_colors_data]
        # Створюємо екземпляр елемента
        item = Item.objects.create(parent_type=parent_type, **validated_data)
        # Додаємо типи елементу до екземпляра елемента
        item.category.set(item_type_objs)
        item.item_sizes.set(item_sizes_objs)
        item.item_colors.set(item_colors_objs)

        return item
