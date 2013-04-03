
Redmine déployable en environnement e-TF1

Installation des gems:


# Pour installation de mysql2
bundle config build.mysql2 --with-mysql-include=/usr/include/mysql

# Pour installation de rmagick
export PKG_CONFIG_PATH=/opt/imagemagick/lib/pkgconfig
bundle install --no-deployment --binstubs --path vendor/bundle
