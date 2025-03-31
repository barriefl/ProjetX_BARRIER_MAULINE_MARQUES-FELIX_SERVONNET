FROM php:7.4-apache

# Installer les extensions nécessaires pour PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Activer les modules Apache si nécessaire
RUN a2enmod rewrite

# Copier le code source
COPY ./web /var/www/html

# Donner les bons droits
RUN chown -R www-data:www-data /var/www/html
