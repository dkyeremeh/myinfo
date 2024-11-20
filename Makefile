dev: 
	(cd services/account; yarn dev) & (cd services/web; yarn dev)

run: 
	kubectl apply -f k8s

build:
	./scripts/build

push:
	./scripts/push