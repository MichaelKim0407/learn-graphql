FROM python:3.11

WORKDIR /tmp/install
COPY ./requirements.txt ./
RUN pip install -r requirements.txt

WORKDIR /django
COPY . .

CMD python manage.py runserver
