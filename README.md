
Redmine déployable en environnement e-TF1

# Pour installation de mysql2
bundle config build.mysql2 --with-mysql-include=/usr/include/mysql

# Pour installation de rmagick
export PKG_CONFIG_PATH=/opt/imagemagick/lib/pkgconfig
bundle install --no-deployment --binstubs --path vendor/bundle

# S'assurer que config/databases.yml est configuré correctement

# Migrer la base
./bin/rake db:migrate RAILS_ENV=production

# Clean up
./bin/rake tmp:cache:clear
./bin/rake tmp:sessions:clear

# Installation du module apache 2 (Passenger)
sudo yum install curl-devel
./bin/passenger-install-apache2-module

# Suivre les instructions pour configurer apache. Fichier de conf suggéré: /etc/httpd/conf.d/passenger.conf

# Redémarrer apache
sudo service httpd restart
