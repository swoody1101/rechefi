import librosa
import numpy as np
import soundfile as sf
import matplotlib.pyplot as plt

def down_sample(input_wav, origin_sr, resample_sr):
    y, sr = librosa.load(input_wav, sr=origin_sr)
    resample = librosa.resample(y, sr, resample_sr)
    print("original wav sr: {}, original wav shape: {}, resample wav sr: {}, resmaple shape: {}".format(origin_sr, y.shape, resample_sr, resample.shape))

    plt.figure(figsize=(10, 4))
    plt.subplot(2, 1, 1)
    time1 = np.linspace(0, len(y) / sr, len(y))
    plt.plot(time1, y)
    plt.title('Original Wav')

    plt.subplot(2, 1, 2)
    time2 = np.linspace(0, len(resample) / resample_sr, len(resample))
    plt.plot(time2, resample)
    plt.title('Resampled Wav')

    plt.tight_layout()
    # plt.savefig('compare_48k_vs_16k.png')

    # sf.write('./bin/' + '48k.wav' , y, origin_sr, format='WAV', endian='LITTLE', subtype='PCM_16')
    sf.write('./' + 'voice8_16k.wav', resample, resample_sr, format='WAV', endian='LITTLE', subtype='PCM_16')

man_original_data = 'C:/Users/multicampus/Desktop/SSAFY7기/특화PJT/인공지능/STT/pre-trained/KoreanSTT-DeepSpeech2-main/voice8.wav'
down_sample(man_original_data, 44100, 16000)