# Docker 🐳
build:
        clear
        @echo "Installation de l'application EduMentor..."
        @echo "🐳 Building Docker containers..."
        docker compose build --no-cache
        docker compose up -d
        docker exec -it symfony-php composer install
        docker exec -it symfony-php composer php bin/console doctrine:database:create --if-not-exists
        docker exec -it symfony-php composer php bin/console doctrine:migrations:migrate -n
        docker exec -it symfony-php composer php bin/console doctrine:fixtures:load -n