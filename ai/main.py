from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import os
import time
import find_file 
import noise_reduction
import sys
from KoreanSTT_DeepSpeech2 import main

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
async def index():
    return {"message": "Hello Test World"}

@app.post('/stt')
async def result(request: Request, file: UploadFile = File(...)):
    start = time.time()
    path = "."
    new_file = open(f'{path}/{file.filename}', 'wb+')
    new_file.write(file.file.read())
    new_file.close()
    print("파일이 나오나? ,", file.filename)
    file_path = os.getcwd()
    file_name = file.filename
    
    # 확장자 안 붙어 있는 이름 구하기 
    name_char_list = []
    for i in range(len(file_name) -4):
        name_char_list.append(file_name[i])
    only_file_name = "".join(name_char_list)
    # 들여온 파일 경로, noise-reduction 거친 파일 경로
    file_path_normal = file_path + '/' + file_name
    file_path_reduc = file_path + '/' + only_file_name + '_reduc.wav'
    
      # 메인 로직
    # 1. noise-reduction
    # 2. STT
    # 3. 결괏값 토대로 갈무리
    noise_reduction.noise_reduction(file_path_normal)
    stt_result = main.stt_logic(file_path_reduc)
    print("STT 결과물", stt_result)
    
    os.remove(file_path)
    os.remove(file_path_reduc)
    end = time.time()
    print(f'time taken: {end - start}')
    response = "1234"
    response.status_code = 200
    return response

