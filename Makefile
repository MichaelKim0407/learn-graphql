build:
	docker-compose pull
	docker-compose run --rm backend yarn install --frozen-lockfile
