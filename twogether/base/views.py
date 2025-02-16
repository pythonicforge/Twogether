from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
from .models import RoomMember
import random
import time
import json
from django.views.decorators.csrf import csrf_exempt

APP_ID = 'f7ea76aacf2b46c5929e705d1fa6721a'
APP_CERTIFICATE = 'c21c01873e9e43489e7d9ae6f3039a3b'

def get_token(request):
    channel_name = request.GET.get('channel')
    if not channel_name:
        return JsonResponse({'error': 'Channel name is required'}, status=400)

    uid = random.randint(1, 1000000)
    role = 1
    expiration_time_in_seconds = 3600 * 24
    current_timestamp = int(time.time())
    privilege_expired_ts = current_timestamp + expiration_time_in_seconds

    token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channel_name, uid, role, privilege_expired_ts)

    return JsonResponse({'uid': uid, 'token': token})

@csrf_exempt
def create_user(request):
    try:
        data = json.loads(request.body)
        member, created = RoomMember.objects.get_or_create(
            name=data['name'],
            uid=data['UID'],
            room_name=data['room_name']
        )
        return JsonResponse({'name': member.name}, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_user(request):
    uid = request.GET.get('uid')
    room_name = request.GET.get('room_name')
    try:
        member = RoomMember.objects.get(uid=uid, room_name=room_name)
        return JsonResponse({'name': member.name}, safe=False)
    except RoomMember.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

def lobby(request):
    return render(request, 'base/lobby.html')

def room(request):
    return render(request, 'base/room.html')
