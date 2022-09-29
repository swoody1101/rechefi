
def get_command(stt_text):
    
    commands = ["요리시작", "멈춰", "중지", "다음단계", "이전단계", "처음부터", "재료목록"]
    counts = [0,0,0,0,0,0,0]
    for i in range(len(commands)):
        for command_cha in commands[i]:
            for stt_cha in stt_text:
                # 기본적인 음절 비교
                if stt_cha == command_cha:
                    counts[i] += 1
        
        if commands[i] == "요리시작":
            for stt_cha in stt_text:
                if (stt_cha == "여") or (stt_cha == "야") or (stt_cha == "유") or (stt_cha == "오") or (stt_cha == "어") or (stt_cha == "이") or (stt_cha == "지") or (stt_cha == "치") or (stt_cha == "사") or (stt_cha == "자") or (stt_cha == "장") or (stt_cha == "악") or (stt_cha == "착"):
                    counts[i] += 1          
            
        elif commands[i] == "멈춰":
            for stt_cha in stt_text:
                if (stt_cha == "머") or (stt_cha == "추") or (stt_cha == "어") or (stt_cha == "하") or (stt_cha == "허") or (stt_cha == "먼") or (stt_cha == "아"):
                    counts[i] += 1
        # 소음 있을 때 다시 해보기                  
        elif commands[i] == "다음단계":
            for stt_cha in stt_text:
                if (stt_cha == "라") or (stt_cha == "암") or (stt_cha == "임") or (stt_cha == "방") or (stt_cha == "게") or (stt_cha == "개") or (stt_cha == "에") or (stt_cha == "애"):
                    counts[i] += 1
        # 소음 있을 때 다시 해보기             
        elif commands[i] == "이전단계":
            for stt_cha in stt_text:
                if (stt_cha == "지") or (stt_cha == "나") or (stt_cha == "조") or (stt_cha == "않") or (stt_cha == "하") or (stt_cha == "한") or (stt_cha == "안") or (stt_cha == "방") or (stt_cha =="게") or (stt_cha == "개") or (stt_cha == "에") or (stt_cha == "애"):
                    counts[i] += 1
                    
        elif commands[i] == "처음부터":
            for stt_cha in stt_text:
                if (stt_cha == "저") or (stt_cha == "져") or (stt_cha == "엄") or (stt_cha == "첨") or (stt_cha == "차") or (stt_cha == "참") or (stt_cha == "무") or (stt_cha == "토") or (stt_cha == "타") or (stt_cha == "더") or (stt_cha == "다"):
                    counts[i] += 1
                    
        elif commands[i] == "중지":
            for stt_cha in stt_text:
                if (stt_cha == "부") or (stt_cha == "이"):
                    counts[i] += 1
                    
        elif commands[i] == "재료목록":
            for stt_cha in stt_text:
                if (stt_cha == "제") or (stt_cha == "리") or (stt_cha == "어") or (stt_cha == "오") or (stt_cha == "요") or (stt_cha == "물") or (stt_cha == "어") or (stt_cha == "억"):
                    counts[i] += 1  
        
    # count 측정       
    if sum(counts) == 0:
        return "잘못된 입력입니다."
    else:
        
        command_index = counts.index(max(counts))
        print("인덱스: ", command_index)
        print("counts: ", counts)
        return commands[command_index]