
def get_command(stt_text):
    
    commands = ["일시정지", "멈춰", "다음단계", "이전단계",  "계속읽어줘",  ]
    counts = [0, 0, 0, 0, 0]
    for i in range(len(commands)):
        for command_cha in commands[i]:
            for stt_cha in stt_text:
                # 기본적인 음절 비교
                if stt_cha == command_cha:
                    counts[i] += 1
        
        if commands[i] == "일시정지":
            for stt_cha in stt_text:
                if (stt_cha == "예") or (stt_cha == "치") or (stt_cha == "넝") or (stt_cha == "저") or (stt_cha == "져") or (stt_cha == "기") or (stt_cha == "길") or (stt_cha == "이"):
                    counts[i] += 1          
            
        elif commands[i] == "멈춰":
            for stt_cha in stt_text:
                if (stt_cha == "머") or (stt_cha == "추") or (stt_cha == "어") or (stt_cha == "워") or (stt_cha == "허") or (stt_cha == "먼"):
                    counts[i] += 1
        # 소음 있을 때 다시 해보기                  
        elif commands[i] == "다음단계":
            for stt_cha in stt_text:
                if (stt_cha == "따") or (stt_cha == "나") or (stt_cha == "아") or (stt_cha == "가") or (stt_cha == "마") or (stt_cha == "만") or (stt_cha == "연") or (stt_cha == "은") or (stt_cha == "운") or (stt_cha == "방") or (stt_cha == "딴") or (stt_cha == "딱") or (stt_cha == "탄") or (stt_cha == "간") or (stt_cha == "다") or (stt_cha == "난") or (stt_cha == "게") or (stt_cha == "개") or (stt_cha == "에") or (stt_cha == "애") or (stt_cha == "위") or (stt_cha == "예"):
                    counts[i] += 1
        # 소음 있을 때 다시 해보기             
        elif commands[i] == "이전단계":
            for stt_cha in stt_text:
                if (stt_cha == "유") or (stt_cha == "지") or (stt_cha == "미") or (stt_cha == "연") or (stt_cha == "나") or (stt_cha == "년") or (stt_cha == "않") or (stt_cha == "하") or (stt_cha == "딴") or (stt_cha == "띡") or (stt_cha == "탄") or (stt_cha == "다") or (stt_cha == "한") or (stt_cha == "간") or (stt_cha == "안") or (stt_cha == "방") or (stt_cha =="게") or (stt_cha == "개") or (stt_cha == "걔") or (stt_cha == "에") or (stt_cha == "애") or (stt_cha == "위") or (stt_cha == "예"):
                    counts[i] += 1
                    
        # elif commands[i] == "처음부터":
        #     for stt_cha in stt_text:
        #         if (stt_cha == "저") or (stt_cha == "져") or (stt_cha == "엄") or (stt_cha == "첨") or (stt_cha == "차") or (stt_cha == "참") or (stt_cha == "무") or (stt_cha == "토") or (stt_cha == "타") or (stt_cha == "더") or (stt_cha == "다"):
        #             counts[i] += 1

        # elif commands[i] == "처음부터다시읽어줘":
        #     for stt_cha in stt_text:
        #         if (stt_cha == "저") or (stt_cha == "져") or (stt_cha == "엄") or (stt_cha == "첨") or (stt_cha == "차") or (stt_cha == "참") or (stt_cha == "무") or (stt_cha == "토") or (stt_cha == "타") or (stt_cha == "더") or (stt_cha == "다") or (stt_cha == "아") or (stt_cha == "일") or (stt_cha == "거") or (stt_cha == "주") or (stt_cha == "저"):
        #             counts[i] += 1
                        
        # elif commands[i] == "중지":
        #     for stt_cha in stt_text:
        #         if (stt_cha == "부") or (stt_cha == "공") or (stt_cha == "경") or (stt_cha == "재") or (stt_cha == "이"):
        #             counts[i] += 1
                    
        elif commands[i] == "계속읽어줘":
            for stt_cha in stt_text:
                if (stt_cha == "제") or (stt_cha == "리") or (stt_cha == "오")  or (stt_cha == "물") or (stt_cha == "억") or (stt_cha == "서") or (stt_cha == "죠"):
                    counts[i] += 1  

        # elif commands[i] == "요리재료읽어줘":
        #     for stt_cha in stt_text:
        #         if (stt_cha == "여") or (stt_cha == "유") or (stt_cha == "체") or (stt_cha == "제") or (stt_cha == "를") or (stt_cha == "저") or (stt_cha == "져") or (stt_cha == "로") or (stt_cha == "오") or (stt_cha == "죠"):
        #             counts[i] += 1  

        # elif commands[i] == "레시피읽어줘":
        #     for stt_cha in stt_text:
        #         if (stt_cha == "어") or (stt_cha == "져"):
        #             counts[i] += 1  
        
    # count 측정       
    if sum(counts) == 0:
        return "잘못된 입력입니다."
    else:
        
        command_index = counts.index(max(counts))
        print("인덱스: ", command_index)
        print("counts: ", counts)
        return commands[command_index]