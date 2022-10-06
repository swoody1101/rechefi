from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import os
import time
import change_sr 
import noise_reduction
import find_command
import mono
import sys
from scipy.io import wavfile
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
def result(request: Request, file: UploadFile = File(...)):
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
    
    
###########################################################################################    
    # 들여온 파일 경로, sample rate 16000,  noise-reduction 거친 파일 경로
    file_path_normal = file_path + '/' + file_name
    file_path_mono = file_path + '/' + only_file_name + '_mono.wav'
    file_path_reduc = file_path + '/' + only_file_name + '_mono_reduc.wav'
    file_path_16k = file_path + '/' + only_file_name + '_mono_reduc_16k.wav'
############################################################################################
    # 메인 로직
    ## 1. 파일 sample rate 구하기
    ## 2. stereo --> mono
    ## 3. sample rate 16000으로 바꾸기
    ## 4. noise-reduction
    ## 5. STT
    ## 6. 결괏값 토대로 갈무리
    
    rate = wavfile.read(f"{file_path_normal}")
    file_sample_rate = rate[0]
    
    mono.mono(file_path_normal)
    noise_reduction.noise_reduction(file_path_mono)
    change_sr.down_sample(file_path_reduc, file_sample_rate, 16000, only_file_name)
############################################################################################

    stt_result = main.stt_logic(file_path_16k)
    print("stt: ", stt_result)
    response = find_command.get_command(stt_result)
    print("결과: ", response)
    
    # 끝나고 후처리: 파일 삭제 및 시간 측정
    # os.remove(file_path_normal)
    os.remove(file_path_mono)
    os.remove(file_path_reduc)
    os.remove(file_path_16k)
    end = time.time()
    print(f'time taken: {end - start}')
    return {
        "message": "success",
        "data": f'"{response}"'
    }

