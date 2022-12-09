/*
Contrainte a rajouter
trigger pour verifier qu'il y a bien 2 equipe par match
trigger pour verifier qu'il y a bien 2 joueur par match
Schema relationel :
Sport ( id_sport : int , nom_sport : String (NN ) , description_sport : String)
Session ( id_session : int (1) , date : Date (NN) , statut : String (NN) , heure : Time (NN), identifiant_con : String (NN ) , mdp : String (NN ) , professeur : String (NN) , type_session : String (NN) 
Equipe ( id_equipe : int (1) ,nb_Joueurs : int (NN), total : int )
Eleve ( id_eleve : int (1), nom : String(2) , prénom : String (2) , sexe : String , classe :String(NN) , total_point : int )
Match(id_match : int (1) , resultat_1 : int , resultat_2 : int)
Match_Equipe( le_match : int (1)@Match-id_match , lequipe : int (1) @Equipe-id_equipe)
Match_Eleve(un_match : int (1) @Match-id_match, leleves : int(1) @ Eleve-id_equipe)
Statistique(id_stats : int (1), intitule : String, stats : double, lEleve : int @Eleve-id_eleve)

Contraintes VARCHAR2(250)uelles :
Session :
DOM_statut = {en cours , terminer}
DOM_type_session : {tournois , resultat}
Natation :
DOM_plongeons : {0,1}
Eleve:
DOM_sexe : {homme, femme}
*/




DROP TABLE Sport;
DROP TABLE Equipe;
DROP TABLE Session;
DROP TABLE Eleve;
DROP TABLE Statistique;
DROP TABLE Match;
DROP TABLE Match_Equipe;
DROP TABLE Match_Eleve;
DROP TABLE Resultat;
DROP TABLE Escalade;




CREATE TABLE Sport(
    id_sport NUMBER    
        CONSTRAINT pk_Sport PRIMARY KEY,
    nom_sport VARCHAR2(30) NOT NULL,
    description_sport VARCHAR2(250)
);

CREATE TABLE Equipe(
    id_equipe NUMBER    
        CONSTRAINT pk_Equipe PRIMARY KEY,
    nb_joueurs NUMBER,
    total NUMBER   
);

CREATE TABLE Session(
    id_session NUMBER    
        CONSTRAINT pk_Session PRIMARY KEY,
    date_session DATE NOT NULL,
    statut VARCHAR2(10) NOT NULL
        CONSTRAINT ck_statut CHECK (statut IN ("en cours", "terminer")),
    heure TIME NOT NULL,
    identifiant_con VARCHAR2(50) NOT NULL,
    mdp VARCHAR2(50) NOT NULL,
    professeur VARCHAR2(30) NOT NULL,
    type_session VARCHAR2(10) NOT NULL
        CONSTRAINT ck_type_session CHECK (type_session IN ("tournois", "resultat")),
    le_sport NUMBER 
        CONSTRAINT fk_Session_Sport REFERENCES Sport(id_sport)
);

CREATE TABLE Eleve(
    id_eleve NUMBER    
        CONSTRAINT pk_Eleve PRIMARY KEY,
    nom VARCHAR2(20) NOT NULL,
    prenom VARCHAR2(20) NOT NULL,
    sexe VARCHAR2(10)
        CONSTRAINT ck_sexe CHECK (sexe IN ("homme", "femme"))
    classe VARCHAR2(50) NOT NULL,
    total_points NUMBER,   
    l_equipe NUMBER
        CONSTRAINT fk_Eleve_Equipe REFERENCES Equipe(id_equipe)
);

CREATE TABLE Statistique(
    id_stats NUMBER
        CONSTRAINT pk_Eleve PRIMARY KEY,
    intitule VARCHAR2(250),
    stats NUMBER,
    lEleve NUMBER
        CONSTRAINT fk_Statistique_Eleve REFERENCES Eleve(id_eleve)
);

CREATE TABLE Match(
    id_match NUMBER    
        CONSTRAINT pk_Match PRIMARY KEY,
    resultat_equipe_1 NUMBER,
    resultat_equipe_2 NUMBER,
    la_session NUMBER
        CONSTRAINT fk_Match_Session REFERENCES Session(id_session),    
);

CREATE TABLE Match_Equipe(
    le_match NUMBER    
        CONSTRAINT fk_Match_Equipe REFERENCES Match(id_match),
    lequipe NUMBER    
        CONSTRAINT fk_Equipe_Match REFERENCES Equipe(id_equipe),
    CONSTRAINT pk_Match_Equipe PRIMARY KEY (le_match, les_equipe)
);

CREATE TABLE Match_Eleve(
    un_match NUMBER    
        CONSTRAINT fk_Match_Eleve REFERENCES Match(id_match),
    leleve NUMBER    
        CONSTRAINT fk_Eleve_Match REFERENCES Eleve(id_eleve),
    CONSTRAINT pk_Match_Eleve PRIMARY KEY (id_match, id_eleve)
);

CREATE TABLE Resultat (
    id_resultat NUMBER
        CONTRAINT pk_Resultat PRIMARY KEY,
    temps TIME,
    distance NUMBER,
    freq_card NUMBER,
    complementaire String,
    la_session NUMBER
        CONSTRAINT fk_Resultat_Session REFERENCES Session(id_session),
    unEleve NUMBER
        CONSTRAINT fk_Resultat_Eleve REFERENCES Eleve(id_eleve)
);

CREATE TABLE Escalade (
    id_escalade NUMBER
        CONSTRAINT fk_Escalade_Resultat REFERENCES Resultat(id_resultat)
        CONTRAINT pk_Escalade PRIMARY KEY,
    assureur NUMBER
        CONSTRAINT fk_Escalade_Eleve REFERENCES Eleve(id_eleve),
    total_diff NUMBER
);

CREATE TABLE Voie (
    id_voie NUMBER
        CONSTRAINT pk_Voie PRIMARY KEY,
    deg_diffi NUMBER NOT NULL
);







