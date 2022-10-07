# RECHEFI

## 인공지능을 활용한 음성인식 요리 레시피 사이트

---

- 목차

---

# 1. 팀 소개

<aside>
🤔 B303[그래서 우리는 생각을 했습니다 RECHEFI를 사용하기로] 팀

</aside>

🔥**프론트엔드**

---

정진(Project Leader) [📧](mailto:yunji4452@gmail.com)

이상우 [📧](mailto:swoody1101@gmail.com)

[우상욱(FE design)](https://github.com/YeoUlFox) [📧](mailto:wsu223@gmail.com)

🔥**백엔드**

---

[장진세(Back-end Leader)](https://github.com/hamelin92) [📧](mailto:hamelin92@gmail.com)

이현태(AI Core developer) [📧](mailto:gusxosmsdy@gmail.com)

이수랑 [📧](mailto:rang628@naver.com)

# 2. 프로젝트 소개

- RECHEFI는 TTS를 활용하여 레시피를 읽어주고 이를 STT로 제어할 수 있는 레시피 공유 웹사이트입니다.
- 인공지능을 활용한 STT 기능으로 사용자의 음성을 인식하여, 명령어를 실행할 수 있습니다.
- 각자 자신만의 레시피를 레시피 게시판에 올려 공유할 수 있습니다.
- 요리자랑 게시판을 통해 요리 결과물을 자랑할 수 있습니다.
- 자유게시판에서 자유로운 주제로 소통할 수 있습니다.

# 3. 프로젝트 기능

## 3.1. 회원 관리

- 로그인
    - 자동 로그인 기능
    - jwt 사용
- 회원가입
    - 이메일 인증
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled.png)
        
    - 이메일, 닉네임 중복 체크
- 프로필
- 프로필 수정
    
    ![ezgif.com-gif-maker.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/ezgif.com-gif-maker.gif)
    
- 마이프로필 및 상대방 프로필 조회
    
    ![ezgif.com-gif-maker.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/ezgif.com-gif-maker%201.gif)
    

## 3.2. 메인

- 정해진 태그로 레시피 조회
    
    ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%201.png)
    
- 사이드바
    - 비로그인
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%202.png)
        
    - 로그인
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%203.png)
        
- 레시피 게시판
    - 제목, 작성자, 태그, 요리재료 등으로 자유롭게 검색
        
        ![레시피 검색.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EB%25A0%2588%25EC%258B%259C%25ED%2594%25BC_%25EA%25B2%2580%25EC%2583%2589.gif)
        
    - 
    
    ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%204.png)
    
    - 레시피 작성 시 블럭 단위로 이미지 업로드 또는 내용 작성 가능
    
- 레시피 상세보기
    - 태그, 재료, 레시피로 구성
    - 레시피는 글과 그림으로 이루어짐
        
        ![레시피 상세 gif.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EB%25A0%2588%25EC%258B%259C%25ED%2594%25BC_%25EC%2583%2581%25EC%2584%25B8_gif.gif)
        
    - 하단에 댓글을 작성할 수 있음
        
        ![댓글 gif.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EB%258C%2593%25EA%25B8%2580_gif.gif)
        
    - 버튼을 눌러 음성 인식 기능을 활성화할 수 있음
        
        ![버튼 누름 gif.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EB%25B2%2584%25ED%258A%25BC_%25EB%2588%2584%25EB%25A6%2584_gif.gif)
        
    - TTS를 통해 음성 읽어주기 기능이 활성화되면서 읽을 텍스트를 화면에 띄워줌
        
        ![읽어줌 gif.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EC%259D%25BD%25EC%2596%25B4%25EC%25A4%258C_gif.gif)
        
    - STT를 통해 명령어를 말하여 해당 명령어에 따른 기능을 수행함
        
        ![stt gif.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/stt_gif.gif)
        

## 3.3. 커뮤니티

- 자유게시판
    - mui pagination component를 활용한 페이지 구현
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%205.png)
        
    - 글 작성, 수정, 삭제
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%206.png)
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%207.png)
        
    - 관리자의 경우 공지글을 작성 가능, 모든 글을 삭제 가능
    - 계층형 댓글 구현, 삭제 가능
        
        ![댓글 작성.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EB%258C%2593%25EA%25B8%2580_%25EC%259E%2591%25EC%2584%25B1.gif)
        
- 요리자랑 게시판
    - react query를 활용한, Infinity Scroll 구현
        
        ![요리자랑 스크롤.gif](RECHEFI%204f246709a17d4292b016280d450c7d0a/%25EC%259A%2594%25EB%25A6%25AC%25EC%259E%2590%25EB%259E%2591_%25EC%258A%25A4%25ED%2581%25AC%25EB%25A1%25A4.gif)
        
    - 요리 자랑 작성, 삭제
        
        그림과 함께 참고 레시피를 확인 가능
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%208.png)
        
- 마이페이지
    - 자신이 작성한 레시피 확인 가능
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%209.png)
        
    - 자신이 작성한 글을 확인,
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%2010.png)
        
    - 팔로워, 팔로윙 체크
        
        ![Untitled](RECHEFI%204f246709a17d4292b016280d450c7d0a/Untitled%2011.png)
        

# 4. 프로젝트 정보

## 4.1. 개발환경 / 사용 라이브러리

- Backend
    - FastAPI 0.81.0
    - Tortoise-orm 0.19.2
    - Pydantic 1.10.1
    - Fastapi-mail 1.1.4
    - gunicorn 20.1.0
    - uvicorn 0.18.3
    - MySQL 8
    - Redis
    - Amazon S3
- Frontend
    - react 18.2.0
    - react-query 3.39.2
    - react-router-dom 6
    - react-redux 8.0.2
    - emotion 11.10.4
    - mui / icons 5.10.3
    - react-material-ui-carousel 3.4.2
    - redux toolkit 1.8.5
    - axios 0.27.2
    - recoder-js 1.0.7
    - draft-js 0.11.7
    - draft-convert 2.1.13
    - sweetalert2 11.4.33
- AI
    - Anaconda 3.0
    - Pytorch 1.12.1
    - Scipy 1.9.1
    - Speech_recognition 3.8.1
    - Soundfile 0.10.3
    - numpy 1.23.3
    - librosa 0.9.2
- CI/CD
    - AWS EC2
    - docker
    - nginx

## 4.2. 협업툴

- Git
- Notion
- JIRA
- Webex
- Discord

## 4.3. 아키텍쳐

![https://user-images.githubusercontent.com/97648271/194226315-0ed8d4c4-cc45-4f7c-81a0-6717650294f8.png](https://user-images.githubusercontent.com/97648271/194226315-0ed8d4c4-cc45-4f7c-81a0-6717650294f8.png)

# 5. UCC

[https://youtu.be/vsuN0xKnbZw](https://youtu.be/vsuN0xKnbZw)