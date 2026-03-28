1. Configuration du Back-End (Symfony)
Lancé XAMPP

1.1 Via la base de donnée
Aller dans phpmyadmin
cliquer sur Importer
Dans "Type de fichier" : CSV ou SQL
Selectionner l'un des deux fichier du dossier "BaseDeDonnée

1.2 Via symfony
Commandes terminal dans le dossier symfony:
cd .\Back\                                    //Pour entrer dans le dossier back
php bin/console doctrine:database:create         //Pour vérifié la base de donnée

S'il manque les données de StatistiqueLogement : 
php bin/console app:import:stat-logement .\src\Command\stats.csv 

Lancement du serveur : 
symfony serve

2. Configuration du Front
Commandes terminal :

cd .\sae_401\                                       //pour aller dans le dossier front 
npm run dev
