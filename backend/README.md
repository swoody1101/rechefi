# docker

docker 실행

.env 파일, docker파일 설정

docker-compose --env-file ../.env up -d

# backend

python -m venv venv

source venv/Scripts/activate
-> 가상환경 설정

pip install -r requirements.txt
-> 가상환경에 패키지 설치

uvicorn app.main:app --reload
-> 서버 실행

# migration

aerich migrate
-> 최신 models 기준으로 sql문 생성 ( 각 테이블의 참조 대상이 상위에 있도록 수정 필요)

aerich upgrade
-> 최신 models 기준으로 만들어진 sql문을 db에 반영
