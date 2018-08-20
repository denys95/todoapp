run:
	pipenv run python manage.py runserver 0.0.0.0:8000;

makemigrations:
	pipenv run python manage.py makemigrations;

migrate:
	pipenv run python manage.py migrate;

test:
	pipenv run python manage.py test;
