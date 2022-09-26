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

docker 실행

.env 파일, docker파일 설정

docker-compose --env-file ../.env up -d

```commandline
# backend 폴더 기준, 데이터베이스 이미지 및 컨테이너 생성
docker-compose -f db-docker-compose.yaml --env-file ./.env up -d
```
```commandline
# backend 폴더 기준, api 서버 빌드 & 실행
# 이미지 생성
docker build -t fastapi(임의의 이미지 이름) .

# build example
docker build -t fastapi .
# 최종 빌드 명령어
docker build -t hamelin92/b303:(ver) .


# 컨테이너 생성
docker run --env-file ./.env -d --name api(임의의 컨테이너 이름) -p 80:80(포트번호) fastapi(이미지 명)

# run example
docker run --env-file ./.env -d --name api -p 8000:8000 hamelin92/b303:0.1(뒤에 수는 버전)

# ec2 환경에서 api 컨테이너 생성하기
docker pull hamelin92/b303:(ver)

docker run --add-host=host.docker.internal:host-gateway --env-file ./.env -d --name api -p 8000:8000 hamelin92/b303:(ver)
# 리눅스에서는 docker.internal을 제대로 읽을 수 없어서 설정해줘야함.

# 초기 세팅
docker exec (api 컨테이너 id) aerich init -t app.config.TORTOISE_ORM
docker exec (api 컨테이너 id) aerich upgrade
gunicorn --access-logfile ./gunicorn-access.log -R app.main:app --bind 0.0.0.0:8000 --workers 4 --worker-class uvicorn.workers.UvicornWorker
```
# 프론트
docker pull supermilktank8/b303frontend:(ver)

docker run -p 3000:3000 --name frontend supermilktank8/b303frontend:(ver)
이후 데이터 베이스 상황에 따라 마이그레이션 명령어들을 이용하여 DB 테이블 생성하면 완료. 
이미 데이터베이스를 켜두고 테이블을 만들어두었으면 그대로 OK.

DB 켜고 끄기 (켜기 up )
docker-compose -f db-docker-compose.yaml --env-file ./.env up -d


# backend

python -m venv venv

source venv/Scripts/activate
-> 가상환경 설정

pip install -r requirements.txt
-> 가상환경에 패키지 설치

uvicorn app.main:app --reload
-> 서버 실행

# 도커 내부 백엔드 서버 액세스 및 에러 로그 파일 사본 가져오기

docker cp -a api:backend/errors.log ./
docker cp -a api:backend/gunicorn-access.log ./

# migration

aerich migrate (백엔드 개발 전용)
-> 최신 models 기준으로 sql문 생성 ( 각 테이블의 참조 대상이 상위에 있도록 수정 필요)

aerich init -t app.config.TORTOISE_ORM
-> 스키마 생성.
aerich upgrade
-> 최신 models 기준으로 만들어진 sql문을 db에 반영
