# node 설치 후 yarn 도 설치
FROM node:16.16.0 as builder

RUN mkdir /app
WORKDIR /app

RUN npm install yarn
# root 에 app 폴더를 생성

# work dir 고정
# package.json 에 있는 것들 install 
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn install --silent
RUN yarn global add react-scripts@5.0.1 -g --silent

# 소스를 작업폴더로 복사하고 빌드
COPY . /app
RUN yarn run build



# 3000 포트 오픈
EXPOSE 3000

# container 실행 시 자동으로 실행할 
CMD ["yarn",  "start"]