DROP TABLE SPORT;
DROP TABLE EQUIPE;
DROP TABLE SESSION;
DROP TABLE ELEVE;
DROP TABLE MATCH;
DROP TABLE MATCH_EQUIPE;
DROP TABLE MATCH_ELEVE;




CREATE TABLE SPORT(
    id_sport INTEGER    
        CONSTRAINT pk_Sport PRIMARY KEY,
    nom_sport TEXT NOT NULL,
    description_sport TEXT
);

CREATE TABLE EQUIPE(
    id_equipe INTEGER    
        CONSTRAINT pk_Equipe PRIMARY KEY,
    nb_joueurs INTEGER,
    total INTEGER   
);

CREATE TABLE SESSION(
    id_session INTEGER    
        CONSTRAINT pk_Session PRIMARY KEY,
    date_session TEXT NOT NULL,
    statut TEXT NOT NULL,
    heure TIME NOT NULL,
    identifiant_con TEXT NOT NULL,
    mdp TEXT NOT NULL,
    professeur TEXT NOT NULL,
    type_session TEXT NOT NULL,
    le_sport INTEGER
        CONSTRAINT fk_Session_Sport REFERENCES SPORT(id_sport)
);

CREATE TABLE ELEVE(
    id_eleve INTEGER    
        CONSTRAINT pk_Eleve PRIMARY KEY,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    sexe TEXT,
    classe TEXT NOT NULL,
    total_points INTEGER,   
    l_equipe INTEGER
        CONSTRAINT fk_Eleve_Equipe REFERENCES EQUIPE(id_equipe)
);

CREATE TABLE MATCH(
    id_match INTEGER    
        CONSTRAINT pk_Match PRIMARY KEY,
    resultat_equipe_1 INTEGER,
    resultat_equipe_2 INTEGER,
    la_session INTEGER
        CONSTRAINT fk_Match_Session REFERENCES SESSION(id_session),    
);

CREATE TABLE MATCH_EQUIPE(
    le_match INTEGER    
        CONSTRAINT fk_Match_Equipe REFERENCES MATCH(id_match),
    les_equipes INTEGER    
        CONSTRAINT fk_Equipe_Match REFERENCES EQUIPE(id_equipe),
    CONSTRAINT pk_Match_Equipe PRIMARY KEY (le_match, les_equipe)
);

CREATE MATCH_ELEVE(
    un_match INTEGER    
        CONSTRAINT fk_Match_Eleve REFERENCES MATCH(id_match),
    les_eleves INTEGER    
        CONSTRAINT fk_Eleve_Match REFERENCES ELEVE(id_eleve),
    CONSTRAINT pk_Match_Eleve PRIMARY KEY (id_match, id_eleve)
);







