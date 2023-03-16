clean:
	docker rm $(shell docker ps -a -f status=exited -q)

test:
	docker-compose -f docker-compose.test.yaml run app

run:
	docker-compose up
