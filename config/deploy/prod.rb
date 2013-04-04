set :keep_releases, 5
role :web, "prdinfapp003-adm.hanoi.tf1.fr"
role :app, "prdinfapp003-adm.hanoi.tf1.fr"
role :db, "prdinfapp003-adm.hanoi.tf1.fr", :primary => true
