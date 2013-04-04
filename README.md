# Redmine e-TF1
Redmine déployable en environnement e-TF1

### Installation sur une VM de dev ##

##### Installer libyaml (avant ruby)
```
sudo yum install libyaml
```
OU (si le paquet n'est pas disponible dans le repo etf1)
```
wget http://pyyaml.org/download/libyaml/yaml-0.1.4.tar.gz
tar xzvf yaml-0.1.4.tar.gz
cd yaml-0.1.4
./configure --prefix=/usr/local
make
make install
```
OU
```
cd ~/.rvm/archives
wget http://pyyaml.org/download/libyaml/yaml-0.1.4.tar.gz
rvm reinstall 1.9.3 
```


##### Choix de la version de ruby
En date du 04/04/2013:
- Redmine est compatible avec ruby 2.0.0
- ruby 2.0.0 est stable et prêt pour une utilisation en prod (http://www.ruby-lang.org/en/news/2013/02/24/ruby-2-0-0-p0-is-released/)
- phusion passenger 4.0.0.rc2/3/4 N'EST PAS PRET pour fonctionner avec ruby 2.0.0 (http://blog.phusion.nl/2013/02/27/phusion-passenger-4-0-release-candidate-2/)
La version optimale est donc ruby 1.9.3


##### Installation des gems
```
bundle config build.mysql2 --with-mysql-include=/usr/include/mysql
# Pour rmagick
export PKG_CONFIG_PATH=/opt/imagemagick/lib/pkgconfig
bundle install --no-deployment --binstubs --path vendor/bundle
```

##### Base de données
* S'assurer que config/databases.yml est configuré correctement
* Migrer la base

```
./bin/rake db:migrate RAILS_ENV=[development|production]
```

##### Nettoyer
```
./bin/rake tmp:cache:clear
./bin/rake tmp:sessions:clear
```

##### Installation du module apache 2 Passenger
```
sudo yum install curl-devel
./bin/passenger-install-apache2-module
```
Suivre les instructions pour configurer apache. Fichier de conf /etc/httpd/conf.d/passenger.conf
En particulier, ajouter dans le vhost:
```
        # MultiViews must be turned off.
        Options -MultiViews
```

##### Redémarrer apache
```
sudo service httpd restart
```

## Redémarrer l'application
```
touch tmp/restart.txt
```
