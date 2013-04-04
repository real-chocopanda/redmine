set :keep_releases, 10
role :web, "preadmapp001-adm.hanoi.tf1.fr"
role :app, "preadmapp001-adm.hanoi.tf1.fr"
role :db, "preadmapp001-adm.hanoi.tf1.fr", :primary => true
set :rails_env, "staging"
