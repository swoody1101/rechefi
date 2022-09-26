from lib2to3.pytree import convert
import boto3
from fastapi import APIRouter, UploadFile, Depends
from dotenv import load_dotenv
import os, uuid

from app.routers.accounts import get_current_user

load_dotenv()

router = APIRouter(prefix="/image", tags=["image"])

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
REGION_NAME = os.getenv("REGION_NAME")

# S3 연결 및 버킷 할당
async def s3_bucket_connect():
    s3 = boto3.resource('s3',
        aws_access_key_id = AWS_ACCESS_KEY_ID,
        aws_secret_access_key= AWS_SECRET_ACCESS_KEY,
        region_name = REGION_NAME)
    bucket = s3.Bucket(S3_BUCKET_NAME)
    return bucket

# 사이즈 단위 변환
def convert_size(size_bytes):
    import math
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])   



@router.post("/", description="이미지 업로드", status_code=201)
async def test(file: UploadFile, User = Depends(get_current_user)):
    # 이미지 사이즈 및 확장자 확인
    file_content = await file.read()
    await file.seek(0)
    if len(file_content) >= 1e+6:
        size = convert_size(len(file_content))
        return f'파일의 크기가 {size}입니다. 1 MB 이하의 파일만 허용됩니다.'
    if "image" not in file.content_type:
        return  '지원되는 이미지 확장자가 아닙니다.'

    # 파일명 중복 방지를 위해 uuid 사용
    file.filename = "".join([str(uuid.uuid4()), os.path.splitext(file.filename)[1]])

    # 이미지 업로드
    bucket = await s3_bucket_connect()
    bucket.upload_fileobj(file.file, file.filename, ExtraArgs={"ACL": "public-read"})
    return f'https://{S3_BUCKET_NAME}.s3.{REGION_NAME}.amazonaws.com/{file.filename}'


@router.delete("/{img_url:path}", description="이미지 삭제", status_code=200)
async def test(img_url: str, User = Depends(get_current_user)):

    # URL로부터 파일 이름 추출
    img_url = img_url.replace(f'https://{S3_BUCKET_NAME}.s3.{REGION_NAME}.amazonaws.com/','')
    # 파일 이름을 Key value로 해당 파일 삭제
    bucket = await s3_bucket_connect()
    bucket.delete_objects(Delete={
        'Objects': [
            {
                'Key': img_url,
            },
        ],
    },)
    return f'{img_url} 파일이 삭제되었습니다.'