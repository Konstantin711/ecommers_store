from dataclasses import dataclass, fields, asdict
import json
from . import models
from . import serializers

from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializerWithToken

from time import time



@api_view(['POST'])
def registerUser(request):
    data = request.data

    new_user = models.UserProfile.objects.create(
        email=data['email'],
        username=data['name'],
        password=make_password(data['password'])
    )
    serializer = serializers.UserSerializerWithToken(new_user, many=False)
    return Response(serializer.data)


# pathes:
# - men(all)
#   - men/c_type(all in type)
#   - men/c_type/c_slug(choosen item)
# - woman(all)
#   - woman/c_type(all in type)
#   - woman/c_type/c_scug(choosen item)


@dataclass
class AllTypeSlugs:
    shirts: str = 'shirt'
    hudi: str = 'hudi'
    pants: str = 'pants'
    tshirts: str = 't-shirt'


@dataclass
class AllParentSlugs:
    men: str = 'men'
    women: str = 'women'


@api_view()
def getAllURIs(request):
    pathes = {
        'men/all/': 'Get all in men category',
        'women/all/': 'Get all in women category',
        'men/shirt/all': 'Get all in shirt category',
        'women/shirt/all': 'Get all in shirt category',
    }

    return Response(pathes)


@api_view()
def getAllByParent(request, slug):
    """
    Get all elements by parent slug. URI Example: /api/men/all
    """
    if slug not in ['men', 'women']:
        return Response(
            {'message': f"Resource not found. Please use: men or women"},
            status=status.HTTP_404_NOT_FOUND
        )

    all_by_parent = models.Item.objects.filter(parent_type__slug=str(slug))

    serialized_data = serializers.ItemSerializer(all_by_parent, many=True).data

    return Response(
        dict(message='Data collected by parent slug',
             data=serialized_data))


@api_view()
def getAllByType(request, p_slug, t_slug):
    """
    Get all elements by parent and type slug. URI Example: /api/men/shirt/all
    """

    ts = AllTypeSlugs()
    ps = AllParentSlugs()

    type_slugs = asdict(ts)
    parent_slugs = asdict(ps)

    if p_slug not in parent_slugs.values() or t_slug not in type_slugs.values():
        return Response(
            {'message': f"Resource not found. Use one of: {type_slugs.values()}"},
            status=status.HTTP_404_NOT_FOUND)

    all_by_type = models.Item.objects.filter(
        parent_type__slug=str(p_slug), item_type__slug=str(t_slug)
    )

    serialized_data = serializers.ItemSerializer(all_by_type, many=True).data

    return Response(
        dict(message='Data collected by parent and type slug',
             data=serialized_data))


@api_view()
def getItemBySlug(request, slug):
    """Get Item by slug"""

    item = models.Item.objects.get(slug=str(slug))

    serialized_data = serializers.ItemSerializer(item, many=False).data

    return Response(
        dict(message='Item by concrete slug is returned',
             data=serialized_data))


# ADMIN API

@api_view(["POST", "GET"])
def addNewItem(request):
    """Create a new Item"""

    if request.method == "GET":
        parent_types = models.ParentType.objects.all()
        categories = models.ItemType.objects.all()
        sizes = models.ItemSizes.objects.all()
        colors = models.ItemColors.objects.all()

        serialized_types = serializers.ParentTypeSerializer(parent_types, many=True).data
        serialized_categories = serializers.ItemTypeSerializer(categories, many=True).data
        serialized_sizes = serializers.SizesSerializer(sizes, many=True).data
        serialized_colors = serializers.ColorsSerializer(colors, many=True).data

        page_data = {"types": serialized_types, 
                     "categories": serialized_categories, 
                     "sizes": serialized_sizes, 
                     "colors": serialized_colors}

        return Response(page_data, status=status.HTTP_200_OK)
    
    else:
        data = request.data.dict()

        def slug_generator():
            digits = str(time())[-5:-1]
            return f'TSHRT{digits}PRNT'

        print(data, 'DATA BEFORE')

        data['slug'] = slug_generator()
        data['parent_type'] = json.loads(data.get('parent_type', '{}'))
        data['category'] = json.loads(data.get('category', '[]'))
        data['item_sizes'] = json.loads(data.get('item_sizes', '[]'))
        data['item_colors'] = json.loads(data.get('item_colors', '[]'))

        files = request.FILES.getlist('images[0]')
        data['images'] = files[0]

        serialized_data = serializers.ItemSerializer(data=data)
        print(serialized_data.is_valid())
        print(serialized_data.errors)

        if serialized_data.is_valid():
            serialized_data.save()
            return Response(serialized_data.data, status=status.HTTP_201_CREATED)
        return Response({'error': 'serialized_data.data'}, status=status.HTTP_400_BAD_REQUEST)



