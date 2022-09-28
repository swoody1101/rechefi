from scipy.io import wavfile
import noisereduce as nr
def noise_reduction(file_path):
    # load data
    rate, data = wavfile.read(f"{file_path}")
    name_without_wav = []
    for i in range(len(file_path) -4):
        name_without_wav.append(file_path[i])
    only_file_name = "".join(name_without_wav)
    # perform noise reduction
    reduced_noise = nr.reduce_noise(y=data, sr=rate)
    wavfile.write(f"{only_file_name}" + "_reduc.wav", rate, reduced_noise)