FROM python:3.6-alpine

RUN mkdir /app

WORKDIR /app

COPY Pipfile /app/Pipfile
COPY Pipfile.lock /app/Pipfile.lock

RUN apk update && apk add --virtual build-deps gcc python-dev musl-dev postgresql-dev
RUN pip install pipenv
RUN pipenv install --deploy --system

COPY api /app

CMD ["gunicorn", "-w 4", "--bind=127.0.0.1:8000", "todoapp.wsgi:application"]
