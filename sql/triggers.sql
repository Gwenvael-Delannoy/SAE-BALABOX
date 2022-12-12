-----------
-- trigger to if there is 2 teams per match
-----------
DROP TRIGGER IF EXISTS trig_match_equipe_insert;

delimiter //
CREATE TRIGGER trig_match_equipe_insert
BEFORE INSERT ON Match_Equipe 
FOR EACH ROW
    
BEGIN
    DECLARE nb_equipe INTEGER;
    select count(*) into nb_equipe 
    from Match_Equipe
    where le_match = NEW.le_match;

    IF nb_equipe >= 2 THEN
        SIGNAL SQLSTATE '80001' SET MESSAGE_TEXT='Match déjà complet avec 2 équipes';
    END IF;
END//
delimiter ;

DROP TRIGGER IF EXISTS trig_match_equipe_update;

delimiter //
CREATE TRIGGER trig_match_equipe_update
BEFORE UPDATE ON Match_Equipe 
FOR EACH ROW
    
BEGIN
    DECLARE nb_equipe INTEGER;
    select count(*) into nb_equipe 
    from Match_Equipe
    where le_match = NEW.le_match;

    IF nb_equipe >= 2 THEN
        SIGNAL SQLSTATE '80001' SET MESSAGE_TEXT='Match déjà complet avec 2 équipes';
    END IF;
END//
delimiter ;

-- ---------
-- trigger to check if there is 2 players per match
-- ---------
DROP TRIGGER IF EXISTS trig_match_eleve_insert;

delimiter //
CREATE TRIGGER trig_match_eleve_insert
BEFORE INSERT ON Match_Eleve 
FOR EACH ROW
    
BEGIN
    DECLARE nb_eleve INTEGER;
    select count(*) into nb_eleve
    from Match_Equipe
    where un_match = NEW.un_match;

    IF nb_eleve >= 2 THEN
        SIGNAL SQLSTATE '80001' SET MESSAGE_TEXT='Match déjà complet avec 2 équipes';
    END IF;
END//
delimiter ;

DROP TRIGGER IF EXISTS trig_match_eleve_update;

delimiter //
CREATE TRIGGER trig_match_eleve_update
BEFORE UPDATE ON Match_Eleve 
FOR EACH ROW

BEGIN
    DECLARE nb_eleve INTEGER;
    select count(*) into nb_eleve 
    from Match_Equipe
    where un_match = NEW.un_match;

    IF nb_eleve >= 2 THEN
        SIGNAL SQLSTATE '80001' SET MESSAGE_TEXT='Match déjà complet avec 2 équipes';
    END IF;
END//
delimiter ;
