
-- 
-- Base de données : ` balabox section sport`
-- @AUTHOR L'equipe DEGT de L'IUT de Vannes
-- @DATE 2022
-- @VERSION 1.0

/**
* Creer une base de données et la configurer
*/


CREATE DATABASE IF NOT EXISTS balabox_sport_db;
DROP USER IF EXISTS balabox@localhost;
CREATE USER balabox@localhost;
GRANT ALL ON balabox_sport_db.* TO balabox@localhost;
ALTER USER 'balabox'@'localhost' IDENTIFIED WITH mysql_native_password BY 'balabox';
USE balabox_sport_db;


/**
Schema relationel complet de la base de donnée:
    Sport(id_sport (INTEGER), nom_sport (VARCHAR(30)), description_sport (VARCHAR(250)), type_session (VARCHAR(20))

    Equipe(id_equipe (INTEGER), nb_joueurs (INTEGER), total (INTEGER))

    Session(id_session (INTEGER), date_session (DATE), statut (VARCHAR(10)), heure (TIME), identifiant_con (VARCHAR(50)), mdp (VARCHAR(50)), professeur (VARCHAR(30)), le_sport (INTEGER))

    Eleve(id_eleve (INTEGER), nom (VARCHAR(20)), prenom (VARCHAR(20)), sexe (VARCHAR(10)), classe (VARCHAR(50)), total_points (INTEGER))

    Eleve_Equipe(l_eleve (INTEGER), l_equipe (INTEGER))

    Statistique(id_stats (INTEGER), intitule (VARCHAR(250)), stats (INTEGER), lEleve (INTEGER))

    Match_(id_match (INTEGER), resultat_equipe_1 (INTEGER), resultat_equipe_2 (INTEGER), la_session (INTEGER))

    Match_Equipe(le_match (INTEGER), lequipe (INTEGER),gagnant (INTEGER))

    Match_Eleve(le_match (INTEGER), le_eleve (INTEGER),gagnant (INTEGER))

    Musculation(id_musculation (INTEGER), muscle_travailler (VARCHAR(50)), series (INTEGER), nb_reps (INTEGER), intensite (INTEGER), charge (INTEGER), ressenti (VARCHAR(250)), id_sport (INTEGER))

    Step(id_step (INTEGER), type_mobilite (VARCHAR(50)), ressenti (VARCHAR(250)), param_indv (VARCHAR(250)), bilan_perso (VARCHAR(250)), perspective (VARCHAR(250)), id_sport (INTEGER))
    
    Figure_Acrosport(lAcrosport (INTEGER) , laFigure (INTEGER))
    
    Acrosport(id_acrosport (INTEGER),  total_point (INTEGER))

    Figure(id_figure (INTEGER), nom (VARCHAR(50)),description (VARCHAR(250)), point(INTEGER))

    Natation(id_natation (INTEGER), style_nage (VARCHAR(50)), plongeons (INTEGER), nom_bassin (VARCHAR(50)))

    Escalade_Voie(lEscalade INTEGER , laVoie INTEGER)

    Voie(id_voie(INTEGER), nom_voie (VARCHAR(50)), deg_diffi (INTEGER))

    Escalade(id_escalade (INTEGER), assureur (VARCHAR(50)), total_diff (INTEGER))

Contraintes textuelles :
Session :
DOM_statut = {en cours , terminer}
DOM_type_session : {tournoi individuel,tournoi equipe , resultat}
Natation :
DOM_plongeons : {0,1}
Eleve:
DOM_sexe : {homme, femme}

Contraintes internes :
trigger pour verifier qu'il y a bien 2 equipes par match maximun
trigger pour verifier qu'il y a bien 2 joueurs par match maximun

*/

-- DROP TABLE Musculation;
-- DROP TABLE Step;
-- DROP TABLE Figure_Acrosport;
-- DROP TABLE Acrosport;
-- DROP TABLE Figure;
-- DROP TABLE Natation;
-- DROP TABLE Escalade_Voie;
-- DROP TABLE Voie;
-- DROP TABLE Escalade;
-- DROP TABLE Resultat;
-- DROP TABLE Match_Eleve;
-- DROP TABLE Match_Equipe;
-- DROP TABLE Match_;
-- DROP TABLE Statistique;
-- DROP TABLE Eleve_Equipe;
-- DROP TABLE Eleve;
-- DROP TABLE Session;
-- DROP TABLE Equipe;
-- DROP TABLE Sport;

CREATE TABLE Sport(
    id_sport INTEGER AUTO_INCREMENT,
    nom_sport VARCHAR(30) NOT NULL,
    description_sport VARCHAR(250),
    type_session VARCHAR(20) NOT NULL,
    

    -- CONSTRAINT
    CONSTRAINT ck_type_session CHECK (type_session IN ("tournoi equipe","tournoi individuel", "resultat")),
    CONSTRAINT pk_Sport PRIMARY KEY (id_sport)
);

CREATE TABLE Equipe(
    id_equipe INTEGER AUTO_INCREMENT,    
    nb_joueurs INTEGER,
    total INTEGER,

    -- CONSTRAINT
    CONSTRAINT pk_Equipe PRIMARY KEY (id_equipe)   
);

CREATE TABLE Session(
    id_session INTEGER AUTO_INCREMENT, 
    date_session DATE DEFAULT(CURRENT_DATE),
    statut VARCHAR(10) NOT NULL,
    heure TIME DEFAULT(CURRENT_TIME),
    identifiant_con VARCHAR(50) NOT NULL,
    mdp VARCHAR(50) NOT NULL,
    professeur VARCHAR(30) NOT NULL,
    le_sport INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Session PRIMARY KEY (id_session),
    CONSTRAINT ck_statut CHECK (statut IN ("en cours", "terminer")),
    CONSTRAINT fk_Sport_Session FOREIGN KEY (le_sport) REFERENCES Sport(id_sport)
);

CREATE TABLE Eleve(
    id_eleve INTEGER AUTO_INCREMENT,    
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    sexe VARCHAR(10),
    classe VARCHAR(50) NOT NULL,
    total_points INTEGER,   

    -- CONSTRAINTS
    CONSTRAINT pk_Eleve PRIMARY KEY (id_eleve),
    CONSTRAINT ck_sexe CHECK (sexe IN ("homme", "femme"))
);

CREATE TABLE Eleve_Equipe(
    l_eleve INTEGER,  
    l_equipe INTEGER,
    
    -- CONSTRAINTS
    CONSTRAINT fk_Eleve_Equipe FOREIGN KEY (l_eleve) REFERENCES Eleve(id_eleve),
    CONSTRAINT fk_Equipe_Eleve FOREIGN KEY (l_equipe) REFERENCES Equipe(id_equipe),
    CONSTRAINT pk_Eleve_Equipe PRIMARY KEY (l_eleve, l_equipe)
);

CREATE TABLE Statistique(
    id_stats INTEGER AUTO_INCREMENT,
    intitule VARCHAR(250),
    stats INTEGER,
    lEleve INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Statistique PRIMARY KEY (id_stats),
    CONSTRAINT fk_Eleve_Statistique FOREIGN KEY (lEleve) REFERENCES Eleve(id_eleve)
);
-- For the some technical reason we have add an _ to avoid the error with the keyword "Match" who is a reserved word in MySQL
CREATE TABLE Match_(
    id_match INTEGER AUTO_INCREMENT, 
    resultat_equipe_1 INTEGER,
    resultat_equipe_2 INTEGER,
    la_session INTEGER,

    -- CONSTRAINTS
    CONSTRAINT  pk_Match PRIMARY KEY (id_match),
    CONSTRAINT fk_Session_Match FOREIGN KEY (la_session) REFERENCES Session(id_session)
    
);

CREATE TABLE Match_Equipe(
    le_match INTEGER,  
    lequipe INTEGER,
    gagnant INTEGER,
    
    -- CONSTRAINTS
    CONSTRAINT fk_Match_Equipe FOREIGN KEY (le_match) REFERENCES Match_(id_match),
    CONSTRAINT fk_Equipe_Match FOREIGN KEY (lequipe) REFERENCES Equipe(id_equipe),
    CONSTRAINT pk_Match_Equipe PRIMARY KEY (le_match, lequipe)
);

CREATE TABLE Match_Eleve(
    un_match INTEGER,   
    leleve INTEGER,
    gagnant INTEGER,

    -- CONSTRAINTS
    CONSTRAINT fk_Match_Eleve FOREIGN KEY (un_match) REFERENCES Match_(id_match),
    CONSTRAINT fk_Eleve_Match FOREIGN KEY (leleve) REFERENCES Eleve(id_eleve),
    CONSTRAINT pk_Match_Eleve PRIMARY KEY (un_match, leleve)
);

CREATE TABLE Resultat (
    id_resultat INTEGER AUTO_INCREMENT,
    temps TIME,
    distance INTEGER,
    freq_card INTEGER,
    complementaire VARCHAR(250),
    la_session INTEGER,
    unEleve INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Resultat PRIMARY KEY (id_resultat),
    CONSTRAINT fk_Resultat_Session FOREIGN KEY (la_session) REFERENCES Session(id_session),
    CONSTRAINT fk_Resultat_Eleve FOREIGN KEY (unEleve) REFERENCES Eleve(id_eleve)
);

CREATE TABLE Escalade (
    id_escalade INTEGER ,
    assureur VARCHAR(50) NOT NULL,
    total_diff INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Escalade PRIMARY KEY (id_escalade),
    CONSTRAINT fk_Escalade_Resultat FOREIGN KEY (id_escalade) REFERENCES Resultat(id_resultat)

);

CREATE TABLE Voie (
    id_voie INTEGER AUTO_INCREMENT,
    nom_voie VARCHAR(50) NOT NULL,
    deg_diffi INTEGER NOT NULL,

    -- CONSTRAINT
    CONSTRAINT pk_Voie PRIMARY KEY (id_voie)
);

CREATE TABLE Escalade_Voie (
    lEscalade INTEGER , 
    laVoie INTEGER,    

    -- CONSTRAINTS
    CONSTRAINT fk_Escalade_Voie FOREIGN KEY (lEscalade) REFERENCES Escalade(id_escalade),
    CONSTRAINT fk_Voie_Escalade FOREIGN KEY (laVoie) REFERENCES Voie(id_voie),
    CONSTRAINT pk_Escalade_Voie PRIMARY KEY (lEscalade, laVoie)
);

CREATE TABLE Natation (
    id_natation INTEGER ,
    style_nage VARCHAR(50),
    plongeons INTEGER,
    nom_bassin VARCHAR(50),
    
    -- CONSTRAINTS
    CONSTRAINT pk_Natation PRIMARY KEY (id_natation),
    CONSTRAINT fk_Natation_Eleve FOREIGN KEY (id_natation) REFERENCES Resultat(id_resultat)

);

CREATE TABLE Figure (
    id_figure INTEGER AUTO_INCREMENT,
    nom VARCHAR(50),
    description VARCHAR(250),
    point INTEGER NOT NULL,

    -- CONSTRAINT
    CONSTRAINT pk_Figure PRIMARY KEY (id_figure)
);

CREATE TABLE Acrosport (
    id_acrosport INTEGER ,
    total_point INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Acrosport PRIMARY KEY (id_acrosport),
    CONSTRAINT fk_Acrosport_Resultat FOREIGN KEY (id_acrosport) REFERENCES Resultat(id_resultat)
);
CREATE TABLE Figure_Acrosport (
    lAcrosport INTEGER , 
    laFigure INTEGER,    

    -- CONSTRAINTS
    CONSTRAINT fk_Acrosport_Figure FOREIGN KEY (lAcrosport) REFERENCES Acrosport(id_acrosport),
    CONSTRAINT fk_Figure_Acrosport FOREIGN KEY (laFigure) REFERENCES Figure(id_figure),
    CONSTRAINT pk_Acrosport_Figure PRIMARY KEY (lAcrosport, laFigure)
);

CREATE TABLE Step (
    id_step INTEGER ,
    type_mobilite VARCHAR(50),
    ressenti VARCHAR(250),
    param_indv VARCHAR(250),
    bilan_perso VARCHAR(250),
    perspective VARCHAR(250),
    
    -- CONSTRAINTS
    CONSTRAINT pk_Step PRIMARY KEY (id_step),
    CONSTRAINT fk_Step_Eleve FOREIGN KEY (id_step) REFERENCES Resultat(id_resultat)
);

CREATE TABLE Musculation (
    id_musculation INTEGER ,
    muscle_travailler VARCHAR(50),
    series INTEGER,
    nb_reps INTEGER,
    intensite INTEGER,
    charge INTEGER,
    ressenti VARCHAR(250),
    
    -- CONSTRAINTS
    CONSTRAINT pk_Musculation PRIMARY KEY (id_musculation),
    CONSTRAINT fk_Musculation_Eleve FOREIGN KEY (id_musculation) REFERENCES Resultat(id_resultat)
);




-- data exemple

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
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test15","test15","Michelle Dupont",2);
INSERT INTO Session(statut,identifiant_con,mdp,professeur,le_sport) VALUES ("en cours","test1","test1","Jack rihiad",6);
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

INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (6,1,3);
INSERT INTO Match_Eleve(un_match , leleve,gagnant) VALUES (6,2,0);

INSERT INTO Match_(resultat_equipe_1,resultat_equipe_2,la_session) VALUES (1,2,2);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (1,2,3);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (1,3,0);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (2,1,3);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (2,5,0);

INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (3,4,3);
INSERT INTO Match_Equipe(le_match , lequipe,gagnant) VALUES (3,5,0);

-- creer un resultat
INSERT INTO Resultat(la_session,unEleve)VALUES(5,1);
INSERT INTO Resultat(la_session,unEleve)VALUES(5,2);
INSERT INTO Resultat(la_session,unEleve)VALUES(7,1);
INSERT INTO Resultat(la_session,unEleve)VALUES(7,2);
INSERT INTO Resultat(la_session,unEleve)VALUES(9,3);
INSERT INTO Resultat(la_session,unEleve)VALUES(9,4);
INSERT INTO Resultat(la_session,unEleve)VALUES(10,5);
INSERT INTO Resultat(la_session,unEleve)VALUES(10,6);
INSERT INTO Resultat(la_session,unEleve)VALUES(8,1);
INSERT INTO Resultat(la_session,unEleve)VALUES(6,1);


-- creer des figures d'acrosport
INSERT INTO Figure(nom,description,point) VALUES ('figure 1','figure 1',1);
INSERT INTO Figure(nom,description,point) VALUES ('figure 2','figure 2',2);
INSERT INTO Figure(nom,description,point) VALUES ('figure 3','figure 3',3);
INSERT INTO Figure(nom,description,point) VALUES ('figure 4','figure 4',4);

-- creer un resultat acrosport

INSERT INTO Acrosport(id_acrosport)VALUES(10);

INSERT INTO Figure_Acrosport(lAcrosport,laFigure)VALUES(10,1);

-- creer un resultat step

INSERT INTO Step (id_step) VALUES (3);
INSERT INTO Step (id_step) VALUES (4);

-- creer un resultat musculation

INSERT INTO Musculation (id_musculation) VALUES (5);
INSERT INTO Musculation (id_musculation) VALUES (6);

-- creer un resultat natation

INSERT INTO Natation (id_natation) VALUES (7);
INSERT INTO Natation (id_natation) VALUES (8);

-- creer des voies d'escalade
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La redoutable',10);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La monté',11);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La pente',12);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('La roue tournante',13);
INSERT INTO Voie(nom_voie,deg_diffi) VALUES ('L enfer',14);


INSERT INTO Escalade(id_escalade, assureur, total_diff)VALUES(1,"Michel", 2);

INSERT INTO Escalade_Voie(lEscalade, laVoie)VALUES(1,1);



SELECT * FROM Eleve;
SELECT * FROM Resultat, Escalade, Escalade_Voie, Voie WHERE id_resultat = id_escalade AND id_escalade = lEscalade AND id_voie = laVoie;

SELECT * FROM Session, Resultat, Step WHERE id_session = la_session AND id_resultat = id_step;

SELECT * FROM Session, Resultat, Sport WHERE id_session = la_session AND le_sport=id_sport AND nom_sport="Course";
SELECT * FROM Session, Resultat, Sport WHERE id_session = la_session AND le_sport=id_sport AND la_session=8;

SELECT * FROM Session, Resultat, Acrosport WHERE id_session = la_session AND id_resultat=id_acrosport ;
SELECT * FROM Acrosport;
SELECT * FROM Resultat, Acrosport WHERE id_resultat=id_acrosport ;

SELECT * FROM Match_Eleve WHERE un_match = 3;
