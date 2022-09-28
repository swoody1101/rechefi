#!/usr/bin/env python
# coding: utf-8

# In[ ]:

import os
import speech_recognition as sr

# 함수 정의부
def get_speech(file_path):
    # 마이크에서 음성을 추출하는 객체
    recognizer = sr.Recognizer()
    # 마이크 설정
    microphone = sr.Microphone(sample_rate=16000)
    
    # 음성 파일로 진행해봄
    voice = sr.AudioFile(f"{file_path}")

    # # 마이크 소음 수치 반영
    # with microphone as source:
    #     recognizer.adjust_for_ambient_noise(source, duration=1)
    #     print("소음 수치 반영하여 음성을 청취합니다. {}".format(recognizer.energy_threshold))
        
    # 음성 파일 소음 수치 반영
    with voice as source:
        recognizer.adjust_for_ambient_noise(source)
        print("소음 수치 반영합니다. {}".format(recognizer.energy_threshold))
        
    # noise reduction 해결 코드 python
    
    # # 음성 수집
    # with microphone as source:
    #     print("목소리를 들을 준비가 되었습니다. 말씀해주세요 :)")
    #     # result = recognizer.listen(source, timeout = 5)
    #     audio = recognizer.listen(source, phrase_time_limit=3).get_raw_data()
    #     # print(audio)
    
    # 음성 수집
    with voice as source:
        print("음성 파일 준비가 되었습니다.")
        # result = recognizer.listen(source, timeout = 5)
        # audio = recognizer.listen(source, phrase_time_limit=3).get_raw_data()
        audio = recognizer.record(source, duration=5).get_raw_data()
        # print(audio)
    return audio
