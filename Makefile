dev: 
	(cd services/auth; yarn dev) & (cd services/ui; yarn dev)

start: 
	kubectl apply -f k8s

stop: 
	kubectl delete -f k8s

build:
	./scripts/build

push:
	./scripts/push