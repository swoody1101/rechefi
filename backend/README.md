<!-- TOC -->
* [0. 백엔드 구조](#0--)
* [1. 개발 환경 세팅](#1---)
  * [1-1. 가상환경](#1-1-)
  * [1-2. 환경변수](#1-2-)
  * [1-3. DB 연결](#1-3-db-)
  * [1-4. 마이그레이션](#1-4-)
  * [1-5. 서버 실행](#1-5--)
* [docker](#docker)
* [프론트](#)
* [backend](#backend)
* [도커 내부 백엔드 서버 액세스 및 에러 로그 파일 사본 가져오기](#----------)
* [migration](#migration)
<!-- TOC -->

# 0. 백엔드 구조
(/backend)
- /app
  - /enums
    - (not used)
  - /models : DB 모델 및 관련 메소드 정의
    - accounts.py
    - community.py
    - recipes.py
  - /routers : api 함수 정의
    - accounts.py
    - community.py
    - image.py
    - index.py
    - recipes.py
  - /schemas : pydantic schema 정의 (serializer)
    - accounts.py
    - common.py
    - community.py
    - recipes.py
  - /tests
    - (not used)
  - main.py
  - config.py
  - mail_config.py
- /migrations
  - /b303
    - (.sql files)
- requirements.txt
- dockerfile

# 1. 개발 환경 세팅

## 1-1. 가상환경
- python 3.9 버전 기준
- backend 경로의 터미널에서 시작하기
```commandline
python -m venv vnev

source venv/Scripts/activate
```
- bash에서는 source 윈도우 cmd에서는 source 대신 call 사용.
```commandline
pip install --upgrade pip
pip install -r requirements.txt
```
- pip 버전 업그레이드는 필수 X

## 1-2. 환경변수 
```dotenv
# Main DB(Mysql)
DB_URL={DB URL}
ROOT_PASSWORD={DB Root Password}
PYTHONUNBUFFERED=TRUE

# Sub DB(Redis)
REDIS_HOST={redis host url}
REDIS_PORT={redis port number}

# 메일링
MAIL_USERNAME={official mail name}
MAIL_PASSWORD={mail password}
MAIL_FROM={mail}
MAIL_PORT={mail port}
MAIL_SERVER={mail server, ex: naver.com}
MAIL_FROM_NAME={mail from name (project name)}

# S3
S3_BUCKET_NAME={S3 bucket name}
AWS_ACCESS_KEY_ID={aws access key id}
AWS_SECRET_ACCESS_KEY={aws secret access key}
REGION_NAME={region name}

# JWT
SECRET_KEY={jwt secret key}
ALGORITHM={encoding algorithm}
ACCESS_TOKEN_EXPIRE_MINUTES={expire minutes}
```

## 1-3. DB 연결
- 도커 db 이미지를 이용한다.
- 프로젝트 내의 db-docker-compose.yaml 파일과 환경변수 .env 파일 필요
- DB 이미지, 컨테이너 생성 및 실행
```commandline
docker-compose -f db-docker-compose.yaml --env-file {PATH/.env} -d
```
- .env 파일이 docker-compose 파일과 같은 경로에 있는 경우
```commandline
docker-compose -f db-docker-compose.yaml --env-file ./.env up -d
```
- DB 컨테이너 종료 시
```commandline
docker-compose down
# OR
docker stop {container name}
```


## 1-4. 마이그레이션
tortoise_orm을 데이터 베이스에 연결한다.
```commandline
aerich init -t app.config.TORTOISE_ORM
```
마이그레이션의 업데이트 내용을 데이터베이스에 적용한다. 
```commandline
aerich upgrade
```
- 마이그레이션 폴더가 없는 경우.
```commandline
aerich init-db
```
- 개발 중 models의 내용을 변경한 경우(새 sql문 작성)
```commandline
aerich migrate
aerich upgrade
```
- aerich migrate를 실행할 때 새로운 테이블들이 다른 테이블을 참조하게 되는 경우 참조할 테이블의 sql문이 먼저 작성되야 하므로 migrate는 순차적으로 진행하거나 마이그레이션의 sql 파일을 직접 확인하여 순서상 오류가 없도록 해야한다.


## 1-5. 서버 실행
- 백엔드 경로의 터미널에서 가상환경을 실행 후 다음 명령어를 입력한다.
```commandline
uvicorn app.main:app --reload
```
- 터미널에 뜨는 로컬호스트에 /docs 주소로 들어가면 swagger 화면이 자동으로 생성된다.


# 2. 도커라이징

## 2-1. 이미지 생성
- docker desktop 실행
- .env 파일, docker파일 가져오기
- DB
```commandline
docker-compose -f db-docker-compose.yaml --env-file ./.env up -d
```
/backend 이미지 생성
```commandline
docker build -t {image 이름} .
docker build -t hamelin92/b303:ver .
```

## 2-2. 도커 컨테이너 생성 및 실행

fastapi 이미지 기반 컨테이너 생성 및 실행
```commandline
docker run --env-file ./.env -d --name api -p 8000:8000 hamelin92/b303:ver
```
- -p : 포트 넘버 지정, --env-file : 환경변수 파일 지정, -d : 백그라운드에서 실행
- 위 명령어에서 api => 컨테이너 이름(임의로 지정) 
- hamelin92/b303:ver => 이미지 이름
- 받아오거나 빌드한 이미지의 이름대로, : 뒤에 붙는 건 태그

## 2-3. 도커 이미지 허브에 올리기
- 먼저 로그인
```commandline
docker login
```
- 터미널에서 로그인 작업 ( 또는 gui로 작업 실행 )
- 이후 도커 허브에 푸시하기.
```commandline
docker push hamelin92/b303:ver
```

## 2-4. 도커 이미지 허브에서 받아오기.
- 터미널에 다음 명령어 입력
```commandline
docker pull supermilktank8/b303frontend:ver
docker pull  hamelin92/b303:ver
```
이후 각 이미지에 맞게 컨테이너 생성 및 실행하기 ( docker run )

# 3. 도커 사용 시 명령어
## 3-1. 이미지, 컨테이너 관련 명령어
- docker build -t [image_name] [도커파일_위치] : 이미지 빌드
- docker run [options] [image_name] : 컨테이너 생성 및 실행
- docker-compose [options] up/down : docker-compose.yaml 기반으로 이미지 생성 및 컨테이너 생성.
- docker start [container_id] : 컨테이너 실행
- docker stop [container_id] : 컨테이너 중지
- docker ps -a : 모든 컨테이너 확인
- docker images -a : 모든 이미지 확인
- -a : 모든
- docker rm [option] [container_id] : 해당 컨테이너 삭제
- docker rmi [option] [image_id] : 해당 이미지 삭제
- [option] / --force : 강제실행 
- docker exec [container_id] [명령어] : 해당 컨테이너 내에서 명령어 실행
- docker cp -a [container_name]:[path]/대상 ./ : 해당 컨테이너 안의 파일을 현재 로컬 경로에 복사하기.

## 3-2. 도커로 실행중인 서버 관리하기

- 서버 액세스, 에러 로그 파일 현재 로컬 경로로 가져오기
```commandline
docker cp -a api:backend/errors.log ./
docker cp -a api:backend/gunicorn-access.log ./
```
- DB 마이그레이션 관련 세팅
- 마이그레이션(aerich migrate) 과정은 개발 과정에서 시행.
```commandline
docker exec my_container_id aerich init -t app.config.TORTOISE_ORM
docker exec my_container_id aerich upgrade
```
- 이미지 받기
```commandline
docker pull supermilktank8/b303frontend:ver
docker pull  hamelin92/b303:ver
```
- 컨테이너 생성
- 작업 시 미리 이전 컨테이너 삭제 해놓기.
```commandline
docker run -p 3000:3000 --name frontend supermilktank8/b303frontend:(ver)
docker run --env-file ./.env -d --name api -p 8000:8000 hamelin92/b303:ver
```

# 4. EC2 접속하기
- MobaXterm을 사용하면 편리하다.
- EC2 인스턴스가 존재하는 경우, 혹은 ssh 서버가 켜져있는 경우
- 좌측 상단 툴바의 Session 클릭
- Basic SSH settings의 [Remote host]에 호스트 주소 입력
- 호스트 주소는 (팀고유코드).p.ss**y.io, 또는 ip 주소 등
- Specify username은 우분투 사용시 ubuntu로 입력.
- port 넘버는 보통 22 사용.
- pem 키 보유시 하단의 Use private key 체크 후 해당하는 칸에 pem 파일을 등록.
- 저장하면 개인 세션 목록에 저장되고 접속 가능하다.
- 따로 pem 키를 입력 안하는 경우 들어갈 때마다 비밀번호 입력해준다.