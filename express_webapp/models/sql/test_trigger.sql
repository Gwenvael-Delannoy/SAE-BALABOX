------------------
-- Test trigger --
------------------

-- Trigger: 1


DELETE FROM Match_Eleve;
DELETE FROM Match_Equipe;
DELETE FROM Match_;
DELETE FROM Eleve;
DELETE FROM Session;
DELETE FROM Equipe;
DELETE FROM Sport;


INSERT INTO Sport VALUES (0,'Football', '');

INSERT INTO Session VALUES (0,'2015-01-01', 'terminer', '12:00:00','1111','1111','prof','tournois',1);

INSERT INTO Equipe VALUES (0,'2', 0);
INSERT INTO Equipe VALUES (0,'2', 0);
INSERT INTO Equipe VALUES (0,'2', 0);

INSERT INTO Eleve VALUES (0,'M','D','homme','2',0,1);
INSERT INTO Eleve VALUES (0,'D','M','femme','2',0,1);
INSERT INTO Eleve VALUES (0,'M','F','homme','2',0,2);

INSERT INTO Match_ VALUES (0,2,1,1);
INSERT INTO Match_ VALUES (0,2,1,1);

INSERT INTO Match_Equipe VALUES (1,1);
INSERT INTO Match_Equipe VALUES (1,2);
INSERT INTO Match_Equipe VALUES (1,3);

INSERT INTO Match_Eleve VALUES (1,1);
INSERT INTO Match_Eleve VALUES (1,2);
INSERT INTO Match_Eleve VALUES (1,3);
