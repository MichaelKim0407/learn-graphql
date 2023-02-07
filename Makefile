build:
	docker-compose pull
	docker-compose run --rm backend yarn install --frozen-lockfile
	docker-compose run --rm frontend yarn install --frozen-lockfile
