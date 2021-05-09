SHELL:=/bin/bash

dev-build:
	yarn
	cd front-end && sudo yarn && cd ..
	cd back-end && sudo yarn && cd ..
	sudo docker-compose -f docker-compose-dev.yml up --build

dev-up:
	sudo docker-compose -f docker-compose-dev.yml up
