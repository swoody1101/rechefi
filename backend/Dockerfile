# 
FROM python:3.9

# 
WORKDIR /backend

# 
COPY ./requirements.txt /backend/requirements.txt

#
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
RUN pip install wait-for-it
RUN apt-get -y update \
 && apt-get -y upgrade \
 && apt-get install -y wait-for-it

# 
COPY ./app /backend/app

#
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]