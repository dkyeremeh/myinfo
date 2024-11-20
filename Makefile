dev: 
	(cd services/account; yarn dev) & (cd services/web; yarn dev)

start: 
	kubectl apply -f k8s/mysql.yml -f k8s/account.yml -f k8s/web.yml

build:
	./scripts/build
	
push:
	./scripts/push