-- exemple de script d'utilisation (données fictives)
/**DELETE FROM Match_Eleve;
DELETE FROM Match_;
DELETE FROM Eleve;
DELETE FROM Equipe;
DELETE FROM Session;
DELETE FROM Sport;*/



-- creer un sport
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Tennis', 'Renvoyer au maximun la balle à adverser',"tournoi individuel");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Football', 'Marquer le plus de but possible',"tournoi equipe");
INSERT INTO Sport(nom_sport,description_sport,type_session)	 VALUES ('Basket', 'Marquer le plus de panier possible',"tournoi equipe");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Handball', 'Marquer le plus de but possible',"tournoi equipe");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Volleyball', 'Marquer le plus de point possible',"tournoi equipe");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Badminton', 'Marquer le plus de point possible',"tournoi individuel");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Musculation', 'Renforcer on corps et s entretenir ',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Natation', 'Nager le plus vite possible',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Escalade', 'Monter le plus haut possible',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Acrosport','Effectuer des figures',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Step','faire monter son rythme cardiaque a un niveau voulu toute en effectuant une danse sur un step',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Course','Savoir géré sa course , effectuer le meilleur temps , ect...',"resultat");
INSERT INTO Sport(nom_sport,description_sport,type_session) VALUES ('Badminton', 'Marquer le plus de point possible',"tournoi equipe");

-- creer une session
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test","test","Michelle Dupont",1);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test15","test15","Raul Adrien",2);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test1","test1","Raul Adrien",6);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test3","test3","JackIE rihr",7);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test4","test4","JA ri",8);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test5","test5","Raul Adrien",9);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test6","test6","Raul Adrien",10);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test7","test7","Raul Adrien",11);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test8","test8","Raul Adrien",12);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test9","test9","Raul Adrien",7);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test10","test10","Raul Adrien",8);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("terminer","test11","test11","Raul Adrien",8);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("terminer","test12","test12","Raul Adrien",1);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("terminer","test13","test13","Raul Adrien",3);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("terminer","test14","test14","Raul Adrien",10);


-- creer une equipe
INSERT INTO Equipe(nb_joueurs,total) VALUES (30,5);
INSERT INTO Equipe(nb_joueurs,total) VALUES (2,0);
INSERT INTO Equipe(nb_joueurs,total) VALUES (2,0);
INSERT INTO Equipe(nb_joueurs,total) VALUES (2,0);
INSERT INTO Equipe(nb_joueurs,total) VALUES (2,0);

-- creer un eleve
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Dupont','Michel','homme','6A',0);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Jack','Remy','homme','6A',0);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Pierre','Pierre','homme','6A',0);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Jean','Jean','homme','6A',0);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Michel','Michel','homme','6A',0);
INSERT INTO Eleve(nom,prenom,sexe,classe,total_points) VALUES ('Jack','Jack','homme','6A',0);


INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (1,2);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (2,2);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (2,3);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (3,3);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (4,3);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (5,4);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (6,4);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (5,5);
INSERT INTO Eleve_Equipe(l_eleve,l_equipe) VALUES (6,5);

-- creer un match
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,4,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (10,2,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (10,12,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (3,12,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (8,12,3);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,2);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,2);
INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,2);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (1,1,3);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (1,2,0);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (2,1,0);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (2,2,3);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (3,1,3);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (3,2,0);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (4,1,3);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (4,2,0);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (5,1,3);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (5,2,0);

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (6,1,1);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (6,2,1);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (7,2,3);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (7,3,0);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (8,1,3);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (8,5,0);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (9,4,0);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (9,5,3);

-- creer des objects resultat
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES("00:00:12",100,145,"épuisé",9,1);
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES(null,null,null,null,7,2);
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES("00:01:48",null,null,"épuisé",6,3);
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES("00:01:48",800,null,"épuisé",11,1);
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES("00:01:48",null,null,null,10,3);
INSERT INTO Resultat(temps,distance,freq_card,complementaire,la_session,unEleve)VALUES("00:01:48",null,156,null,8,1);



-- creer des  objects figures d'acrosport
INSERT INTO Figure(nom,description,point) VALUES ('figure 1','figure 1',1);
INSERT INTO Figure(nom,description,point) VALUES ('figure 2','figure 2',2);
INSERT INTO Figure(nom,description,point) VALUES ('figure 3','figure 3',3);
INSERT INTO Figure(nom,description,point) VALUES ('figure 4','figure 4',4);


-- creer des objects voies d'escalade
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La redoutable',10);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La monté',11);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La pente',12);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La roue tournante',13);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('L enfer',14);

-- creer un object  acrosport
INSERT INTO Acrosport(id_acrosport,total_point)VALUES(2,6);

INSERT INTO Figure_Acrosport(lAcrosport,laFigure)VALUES(2,1);
INSERT INTO Figure_Acrosport(lAcrosport,laFigure)VALUES(2,2);
INSERT INTO Figure_Acrosport(lAcrosport,laFigure)VALUES(2,3);

-- creer un object  escalade
INSERT INTO Escalade(id_escalade,assureur,total_diff)VALUES(3,"Payet",8);
INSERT INTO Escalade_Voie(lEscalade,laVoie)VALUES(3,1);

-- creer un object natation
INSERT INTO Natation(id_natation,style_nage,plongeons,nom_bassin)VALUES(4,"Dos",4,"Le roi");

-- creer un object musculatation
INSERT INTO Musculation(id_musculation,muscle_travailler,series,nb_reps,intensite,charge,ressenti)VALUES(5,"Triceps : Dips",4,10,80,80,"épuisé");

INSERT INTO Step(id_step,type_mobilite,ressenti,param_indv,bilan_perso,perspective)VALUES(6,"Dynamique","Fatigué , manque de sucre aussi","poids de 4kg à la cheville","Tout est bon","Finir la danse semaine prochaine");

