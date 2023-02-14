build:
	docker-compose -f docker-compose.yml pull
	docker-compose -f docker-compose.yml run --rm backend yarn install --frozen-lockfile
	docker-compose -f docker-compose.yml run --rm frontend yarn install --frozen-lockfile

build-dj:
	docker-compose -f docker-compose-django.yml build --pull lock
	docker-compose -f docker-compose-django.yml run --rm lock
	docker-compose -f docker-compose-django.yml build --pull web
