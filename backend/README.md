# docker

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

```
# 프론트
docker pull supermilktank8/b303frontend:(ver)

docker run -p 3000:3000 --name frontend supermilktank8/b303frontend:(ver)
이후 데이터 베이스 상황에 따라 마이그레이션 명령어들을 이용하여 DB 테이블 생성하면 완료. 
이미 데이터베이스를 켜두고 테이블을 만들어두었으면 그대로 OK.


# backend

python -m venv venv

source venv/Scripts/activate
-> 가상환경 설정

pip install -r requirements.txt
-> 가상환경에 패키지 설치

uvicorn app.main:app --reload
-> 서버 실행

# migration

aerich migrate (백엔드 개발 전용)
-> 최신 models 기준으로 sql문 생성 ( 각 테이블의 참조 대상이 상위에 있도록 수정 필요)

aerich init -t app.config.TORTOISE_ORM
-> 스키마 생성.
aerich upgrade
-> 최신 models 기준으로 만들어진 sql문을 db에 반영
