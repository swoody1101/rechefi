#!/usr/bin/env python
# coding: utf-8

# In[1]:


import torch
import torch.nn as nn
from torch import Tensor
import torchaudio
import numpy as np
import librosa

from matplotlib import pyplot as plt
#get_ipython().run_line_magic('matplotlib', 'inline')
import librosa.display
#import IPython.display as ipd

from . import GetSpeech 
from . import tools
import sys
sys.path.insert(0, "D:/server_real/KoreanSTT_DeepSpeech2/kospeech/vocabs")
from ksponspeech import KsponSpeechVocabulary
# from kospeech.models import DeepSpeech2


# In[2]:
def stt_logic(file_path):

    def parser(signal, audio_extension: str = 'pcm') -> Tensor:

        feature = torchaudio.compliance.kaldi.fbank(
            waveform=Tensor(signal).unsqueeze(0),
            num_mel_bins=80,
            frame_length=20,
            frame_shift=10,
            window_type='hamming'
        ).transpose(0, 1).numpy()

        feature -= feature.mean()
        feature /= np.std(feature)

        return torch.FloatTensor(feature).transpose(0, 1)


# In[7]:
    model_path = "./KoreanSTT_DeepSpeech2/model2.pt"
    device = "cpu"

    # Get Speech data
    audiodata = GetSpeech.get_speech(file_path)
    wav_data = librosa.util.buf_to_float(audiodata)

    # Transform to input
    feature = parser(wav_data)
    input_length = torch.LongTensor([len(feature)])
    vocab = KsponSpeechVocabulary('./KoreanSTT_DeepSpeech2/aihub_character_vocabs.csv')

    # Load Kospeech Models
    model = torch.load(model_path, map_location=lambda storage, loc: storage).to(device)
    if isinstance(model, nn.DataParallel):
        model = model.module
        
    model.device = device
    y_hats = model.recognize(feature.unsqueeze(0), input_length)
    sentence = vocab.label_to_string(y_hats.cpu().detach().numpy())

    # plt.plot(wav_data)
    # plt.show()

    # print('')
    # print(type(sentence))
    # print(tools.revise(sentence))
    # ipd.Audio(wav_data, rate=16000)
    return tools.revise(sentence)

