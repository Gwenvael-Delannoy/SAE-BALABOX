-- create an exemple of a new  sport , new session , new eleve

DELETE FROM Match_eleve;
DELETE FROM Match_;
DELETE FROM Eleve;
DELETE FROM Equipe;
DELETE FROM Session;
DELETE FROM Sport;



-- create a new sport
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Tennis', 'Renvoyer au maximun la balle à adverser');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Football', 'Marquer le plus de but possible');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Basket', 'Marquer le plus de panier possible');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Handball', 'Marquer le plus de but possible');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Volleyball', 'Marquer le plus de point possible');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Badminton', 'Marquer le plus de point possible');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Musculation', 'Renforcer on corps et s entretenir ');
INSERT INTO Sport(nom_sport,description_sport) VALUES ('Natation', 'Nager le plus vite possible');

-- create a new session
INSERT INTO Session(statut,identifiant_con,mdp,professeur,type_session,le_sport) VALUES ("en cours","test","test","Michelle Dupont","tournoi individuel",1);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,type_session,le_sport) VALUES ("en cours","test1","test1","Jack rihiad","tournoi individuel",6);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,type_session,le_sport) VALUES ("en cours","test3","test3","JackIE rihr","resultat",7);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,type_session,le_sport) VALUES ("en cours","test4","test4","JA ri","resultat",8);

-- create an equipe 
INSERT INTO Equipe(nb_joueurs,total) VALUES (30,5);

-- create an eleve 
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points,l_equipe) VALUES ('Dupont','Michel','homme','6A',0,1);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points,l_equipe) VALUES ('Jack','Remy','homme','6A',0,1);

-- create a match
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,2);   

INSERT INTO Match_eleve(un_match , leleve) VALUES (1,1);
INSERT INTO Match_eleve(un_match , leleve) VALUES (1,2);
