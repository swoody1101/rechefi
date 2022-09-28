import os

def handle(file, test=False):
    """Handle the received file below"""
    BASE_DIR = os.path.dirname(os.path.realpath(__file__))
    save_path = os.path.join(BASE_DIR, file.name)
    with open(save_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)