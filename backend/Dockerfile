# 
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

# 
WORKDIR /backend

# 
COPY ./requirements.txt /backend/requirements.txt

#
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

# 
COPY ./app /backend/app
COPY ./migrations /backend/migrations
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
#
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "--access-logfile", "./gunicorn-access.log", "--error-logfile", "./errors.log", "--keep-alive", "10", "-R", "app.main:app", "--bind", "0.0.0.0:8000", "--workers", "4"]
