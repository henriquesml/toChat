SHELL:=/bin/bash

build:
	yarn
	cd front-end && sudo yarn && cd ..
	cd back-end && sudo yarn && cd ..
	sudo docker-compose up

up:
	sudo docker-compose up
