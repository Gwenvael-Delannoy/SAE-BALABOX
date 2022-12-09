
-- 
-- Base de données : ` balabox section sport`
-- @AUTHOR L'equipe DEGT de L'IUT de Vannes
-- @DATE 2022
-- @VERSION 1.0

/**
* Create the database
*/
CREATE DATABASE IF NOT EXISTS balabox_sport_db;
USE balabox_sport_db;

/**

Schema relationel :
Sport ( id_sport : int , nom_sport : String (NN ) , description_sport : String)
Session ( id_session : int (1) , date : Date (NN) , statut : String (NN) , heure : Time (NN), identifiant_con : String (NN ) , mdp : String (NN ) , professeur : String (NN) , type_session : String (NN) 
Equipe ( id_equipe : int (1) ,nb_Joueurs : int (NN), total : int )
Eleve ( id_eleve : int (1), nom : String(2) , prénom : String (2) , sexe : String , classe :String(NN) , total_point : int )
Match_(id_match : int (1) , resultat_1 : int , resultat_2 : int)
Match_Equipe( le_match : int (1)@Match-id_match , lequipe : int (1) @Equipe-id_equipe)
Match_Eleve(un_match : int (1) @Match-id_match, leleves : int(1) @ Eleve-id_equipe)
Statistique(id_stats : int (1), intitule : String, stats : double, lEleve : int @Eleve-id_eleve)
Resultat(id_resultat : int (1), le_match : int (1) @Match-id_match, leleve : int (1) @Eleve-id_eleve, lequipe : int (1) @Equipe-id_equipe, le_sport : int (1) @Sport-id_sport)
Escalade(id_escalade : int (1), assureur : int @Eleve-id_eleve, total_diff : int)
Voie (id_voie : int (1), nom_voie : String (NN), hauteur : int (NN), difficulte : int (NN), l_escalade : int (1) @Escalade-id_escalade)
Escalade_voie (lEscalade : int (1) @Escalade-id_escalade, laVoie : int (1) @Voie-id_voie)
Natation (id_natation : int (1)@Resultat-id_resultat ,style_nage : String , plongeons : int, nom_bassin : String  )
Figure (id_figure : int (1), nom : String ,description String ,  point : int (NN))
Acrosport (id_acrosport : int (1) @Resultat-id_resultat, total_point : int ,lesFigures : int @Figure-id_fig )
Step (id_step : int (1) @Resultat-id_resultat,type_mobilite : String , ressenti : String , param_indv : String , bilan_perso : String , perspective : String)
Musculation (id_musculation : int (1) @Resultat-id_resultat,muscle_travailler : String , temps_pause : Time ,series : int , nb_reps : int , intensite : int , charge : Double , ressenti : String )

Contraintes textuelles :
Session :
DOM_statut = {en cours , terminer}
DOM_type_session : {tournois , resultat}
Natation :
DOM_plongeons : {0,1}
Eleve:
DOM_sexe : {homme, femme}

Contraintes internes :
trigger pour verifier qu'il y a bien 2 equipes par match maximun
trigger pour verifier qu'il y a bien 2 joueurs par match maximun

*/

DROP TABLE Musculation;
DROP TABLE Step;
DROP TABLE Acrosport;
DROP TABLE Figure;
DROP TABLE Natation;
DROP TABLE Escalade_Voie;
DROP TABLE Voie;
DROP TABLE Escalade;
DROP TABLE Resultat;
DROP TABLE Match_Eleve;
DROP TABLE Match_Equipe;
DROP TABLE Match_;
DROP TABLE Statistique;
DROP TABLE Eleve;
DROP TABLE Session;
DROP TABLE Equipe;
DROP TABLE Sport;

CREATE TABLE Sport(
    id_sport INTEGER AUTO_INCREMENT,
    nom_sport VARCHAR(30) NOT NULL,
    description_sport VARCHAR(250),

    -- CONSTRAINT
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
    date_session DATE NOT NULL,
    statut VARCHAR(10) NOT NULL,
    heure TIME NOT NULL,
    identifiant_con VARCHAR(50) NOT NULL,
    mdp VARCHAR(50) NOT NULL,
    professeur VARCHAR(30) NOT NULL,
    type_session VARCHAR(10) NOT NULL,
    le_sport INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Session PRIMARY KEY (id_session),
    CONSTRAINT ck_statut CHECK (statut IN ("en cours", "terminer")),
    CONSTRAINT ck_type_session CHECK (type_session IN ("tournois", "resultat")),
    CONSTRAINT fk_Sport_Session FOREIGN KEY (le_sport) REFERENCES Sport(id_sport)
);

CREATE TABLE Eleve(
    id_eleve INTEGER AUTO_INCREMENT,    
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    sexe VARCHAR(10),
    classe VARCHAR(50) NOT NULL,
    total_points INTEGER,   
    l_equipe INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Eleve PRIMARY KEY (id_eleve),
    CONSTRAINT ck_sexe CHECK (sexe IN ("homme", "femme")),
    CONSTRAINT fk_Equipe_Eleve FOREIGN KEY (l_equipe) REFERENCES Equipe(id_equipe)
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
    
    -- CONSTRAINTS
    CONSTRAINT fk_Match_Equipe FOREIGN KEY (le_match) REFERENCES Match_(id_match),
    CONSTRAINT fk_Equipe_Match FOREIGN KEY (lequipe) REFERENCES Equipe(id_equipe),
    CONSTRAINT pk_Match_Equipe PRIMARY KEY (le_match, lequipe)
);

CREATE TABLE Match_Eleve(
    un_match INTEGER,   
    leleve INTEGER,

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
    assureur INTEGER,
    total_diff INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Escalade PRIMARY KEY (id_escalade),
    CONSTRAINT fk_Escalade_Eleve FOREIGN KEY (assureur) REFERENCES Eleve(id_eleve),
    CONSTRAINT fk_Escalade_Resultat FOREIGN KEY (id_escalade) REFERENCES Resultat(id_resultat)

);

CREATE TABLE Voie (
    id_voie INTEGER AUTO_INCREMENT,
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
    lesFigures INTEGER,

    -- CONSTRAINTS
    CONSTRAINT pk_Acrosport PRIMARY KEY (id_acrosport),
    CONSTRAINT fk_Acrosport_Eleve FOREIGN KEY (id_acrosport) REFERENCES Resultat(id_resultat),
    CONSTRAINT fk_Acrosport_Figure FOREIGN KEY (lesFigures) REFERENCES Figure(id_figure)
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
    temps_pause INTEGER,
    series INTEGER,
    nb_reps INTEGER,
    intensite INTEGER,
    charge INTEGER,
    ressenti VARCHAR(250),
    
    -- CONSTRAINTS
    CONSTRAINT pk_Musculation PRIMARY KEY (id_musculation),
    CONSTRAINT fk_Musculation_Eleve FOREIGN KEY (id_musculation) REFERENCES Resultat(id_resultat)
);
