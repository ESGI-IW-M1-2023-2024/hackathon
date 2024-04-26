# Docker 🐳
build:
	clear
	@echo "Installation de l'application Boennologie..."
	@echo "🐳 Building Docker containers..."
	docker compose build --no-cache
	docker compose up -d
	until [ "`docker inspect -f {{.State.Running}} hackathon_mariadb`"=="true" ]; do sleep 0.1; done;
	docker compose exec -it symfony-php composer install
	docker compose exec -it symfony-php bin/console doctrine:database:create --if-not-exists
	docker compose exec -it symfony-php bin/console doctrine:migrations:migrate -n
	docker compose exec -it symfony-php bin/console doctrine:fixtures:load -n
	docker compose exec -it symfony-php chmod 777 -R public/uploads
	@echo "Application ready !"