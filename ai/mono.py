from pydub import AudioSegment
def mono(file_path):
    sound = AudioSegment.from_wav(f"{file_path}")
    sound = sound.set_channels(1)
    name_without_wav = []
    for i in range(len(file_path) -4):
        name_without_wav.append(file_path[i])
    only_file_name = "".join(name_without_wav)
    sound.export(f"{only_file_name}" + '_mono.wav', format="wav")