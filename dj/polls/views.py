from django.http import HttpResponse
from _datetime import datetime
from django.template.loader import get_template


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def test(request):
    testVal = datetime.now()
    t = get_template('test.html')
    html = t.render({'testVal' : testVal})
    return HttpResponse(html)