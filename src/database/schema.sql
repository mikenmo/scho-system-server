DROP USER IF EXISTS 'schosys'@'localhost';
CREATE USER 'schosys'@'localhost' IDENTIFIED BY 'kyahsum';
DROP DATABASE IF EXISTS schosys;
CREATE DATABASE schosys;
GRANT SUPER ON *.* TO 'schosys'@'localhost';
GRANT ALL PRIVILEGES ON schosys.* TO 'schosys'@'localhost' WITH GRANT OPTION;
USE schosys;

CREATE TABLE user (
    studNo VARCHAR(10) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    codeName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,    
    type VARCHAR(255) NOT NULL, -- Possible values: ADMIN / SCHOHEAD / SCHO / NONSCHO
    email VARCHAR(255) NOT NULL,
    contactNo VARCHAR(11) NOT NULL,
    schoPoints INT NOT NULL,
    schoGuardian VARCHAR(10)
);

CREATE TABLE grade (
    id INT NOT NULL AUTO_INCREMENT,
    studNo VARCHAR(10) NOT NULL,
    subject VARCHAR(10) NOT NULL,
    grade FLOAT(3) NOT NULL,
    units INT(2) NOT NULL,
    acadYear VARCHAR(255) NOT NULL,
    semester VARCHAR(255) NOT NULL,
    CONSTRAINT grade_id_pk PRIMARY KEY(id),
    CONSTRAINT grade_studNo FOREIGN KEY(studNo)
        REFERENCES user(studNo) ON DELETE CASCADE
);

CREATE TABLE scho (
    studNo VARCHAR(10) NOT NULL,
    schoBaby VARCHAR(10) NOT NULL,
    CONSTRAINT schoHead_studNo_fk FOREIGN KEY(studNo)
        REFERENCES user(studNo) ON DELETE CASCADE,
    CONSTRAINT schoHead_schoBaby_fk FOREIGN KEY(schoBaby)
        REFERENCES user(studNo) ON DELETE CASCADE
);

CREATE TABLE book (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    quantity INT(2) NOT NULL,
    status VARCHAR(20), -- Available / Not Available
    CONSTRAINT book_id_pk PRIMARY KEY(id)
);

CREATE TABLE announcement (
    id INT NOT NULL AUTO_INCREMENT,
    heading VARCHAR(255) NOT NULL,
    content VARCHAR(1023) NOT NULL,
    time_created DATE NOT NULL,
    studNo VARCHAR(10) NOT NULL,
    CONSTRAINT announcement_id_pk PRIMARY KEY(id),
    CONSTRAINT announcement_studNo_fk FOREIGN KEY (studNo)
        REFERENCES user(studNo) ON DELETE CASCADE
);

CREATE TABLE important_date (
    id INT NOT NULL AUTO_INCREMENT,
    event_title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    CONSTRAINT important_date_id_pk PRIMARY KEY(id)
);
-- ADD TRIGGERS HERE ===========================================================================
delimiter |

CREATE TRIGGER newUser AFTER INSERT ON user
    FOR EACH ROW
        BEGIN
            IF(NEW.type = 'SCHO') THEN
                INSERT INTO scho VALUES (NEW.schoGuardian, NEW.studNo);
            ELSEIF (NEW.type = 'NONSCHO') THEN
                INSERT INTO scho VALUES (NEW.schoGuardian, NEW.studNo);
            END IF;
        END
    |
    delimiter ; 

-- INSTANTIATION ===============================================================================


INSERT INTO `user` VALUES ('2015-00000','123','Memy','Cabarles','Emy Jane','SCHOHEAD','eacabarles@up.edu.ph','09171234567',0,NULL);
INSERT INTO `user` VALUES ('2015-00001','123','Cholo','Canonizado','Carlos Miguel','NONSCHO','cecanonizado@up.edu.ph','09171234567',23,'2015-00000');
INSERT INTO `user` VALUES ('2015-00002','123','Deyved','Benavidez','David Ralph','SCHO','drbenavidez@up.edu.ph','09171234567',46,'2015-00000');
INSERT INTO `user` VALUES ('2015-00003','123','Ciar','Gotis','Ciara Mae','SCHO','cmgotis@up.edu.ph','09171234567',0,'2015-00000');
INSERT INTO `user` VALUES ('2015-01010','password','Jojo','Dela Cruz','Juan','NONSCHO','juandelacruz@up.edu.ph','09121211212',0,'2015-00000');
INSERT INTO `user` VALUES ('2015-88888','qwerty123','KJ','de Luna','Kobe Jee','NONSCHO','kj@up.edu.ph','09123231223',21,'2015-00003');
INSERT INTO `user` VALUES ('2015-99999','1234567123','Jaime123','Samaniego','Jaime','NONSCHO','jasam@up.edu.ph','09123231223',141,'2015-00003');
INSERT INTO `user` VALUES ('admin','admin','NA','NA','NA','ADMIN','scho@yses.org','NA',0,NULL);

INSERT INTO `announcement` VALUES (4,'Scho Sessions','Anyone who wishes to schedule another Scho Session, kindly fill-out this form: https://goo.gl/EYcLyc. Thank you!','2018-01-26','2015-00000');
INSERT INTO `announcement` VALUES (5,'System Announcement','SchoSystem is now up and running! For bug reports, submit them here: https://goo.gl/EYcLyc','2018-01-26','2015-00000');
INSERT INTO `announcement` VALUES (7,'Scho Babies','For my scho babies (David), please approach me for your scho points prizes!','2018-01-26','2015-00002');
INSERT INTO `announcement` VALUES (9,'CMSC 2 Reviewers now available!','You may now get your copies at the tamb','2018-01-26','2015-00003');

INSERT INTO `book` VALUES (1,'Advanced Algebra, Trigonometry and Mathematics','Orines','Phoenix Publishing House',1,'Available');
INSERT INTO `book` VALUES (2,'After Effects CS4','Antony Bolante','Peachpit Press',1,'Not Available');
INSERT INTO `book` VALUES (3,'College Algebra and Trigonometry','Leithold','Pearson',1,'Available');
INSERT INTO `book` VALUES (4,'Discrete Mathematics DeMYSTiFieD','Steven Krantz','McGrawhill',2,'Available');
INSERT INTO `book` VALUES (5,'Java Programming','Joycs Farrell','Thomson Course Technology',1,'Not Available');
INSERT INTO `book` VALUES (6,'Jose Rizal 2nd Edition','Zaide Zaide','All Nations Publishing',1,'Available');
INSERT INTO `book` VALUES (7,'The Calculus 7','Leithold','Harper Collins College',3,'Available');

INSERT INTO `grade` VALUES (1,'2015-00001','EXB 21',1,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (3,'2015-00001','CMSC 128',1.25,5,'2017-2018','2st Semester');
INSERT INTO `grade` VALUES (39,'2015-00003','PE 1',1.25,0,'2015-2016','1st Semester');
INSERT INTO `grade` VALUES (40,'2015-00003','HUM 2',1.75,3,'2015-2016','1st Semester');
INSERT INTO `grade` VALUES (41,'2015-00003','ENG 1',1.5,3,'2015-2016','1st Semester');
INSERT INTO `grade` VALUES (42,'2015-00003','MATH 17',1,5,'2015-2016','1st Semester');
INSERT INTO `grade` VALUES (43,'2015-00003','SOSC 3',2,3,'2015-2016','1st Semester');
INSERT INTO `grade` VALUES (44,'2015-00003','CMSC 2',1.5,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (45,'2015-00003','CMSC 11',1.25,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (46,'2015-00003','ENG 2',1.75,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (47,'2015-00003','SOSC 1',2.5,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (48,'2015-00003','MATH 26',1.25,3,'2015-2016','2nd Semester');
INSERT INTO `grade` VALUES (49,'2015-00003','CMSC 21',1.5,3,'2015-2016','Midyear');
INSERT INTO `grade` VALUES (50,'2015-00003','CMSC 123',1.5,3,'2015-2016','Midyear');
INSERT INTO `grade` VALUES (51,'2015-00003','CMSC 130',2.5,3,'2015-2016','Midyear');
INSERT INTO `grade` VALUES (52,'2015-99999','CMSC 2',2.25,3,'2016-2017','2nd Semester');
INSERT INTO `grade` VALUES (53,'2015-99999','CMSC 141',1.25,3,'2016-2017','2nd Semester');
INSERT INTO `grade` VALUES (54,'2015-99999','CMSC 142',1,3,'2016-2017','2nd Semester');
INSERT INTO `grade` VALUES (55,'2015-88888','CMSC 125',1,3,'2017-2018','2nd Semester');
INSERT INTO `grade` VALUES (56,'2015-88888','CMSC 132',1.25,3,'2017-2018','2nd Semester');
INSERT INTO `grade` VALUES (57,'2015-88888','CMSC 128',1,3,'2017-2018','2nd Semester');
INSERT INTO `grade` VALUES (58,'2015-88888','CMSC 170',1,3,'2017-2018','2nd Semester');
INSERT INTO `grade` VALUES (59,'2015-00002','PE 2',1.5,0,'2019-2020','Midyear');
INSERT INTO `grade` VALUES (60,'2015-00002','HUM 3',1.75,3,'2019-2020','Midyear');

INSERT INTO `important_date` VALUES (1,'MATH 28 First LE','2018-01-01');
INSERT INTO `important_date` VALUES (2,'CMSC 132 First LE','2018-02-1');
INSERT INTO `important_date` VALUES (3,'CMSC 170 First LE','2018-03-22');
INSERT INTO `important_date` VALUES (8,'MGT 101 3rd LE','2018-11-29');
INSERT INTO `important_date` VALUES (9,'Final JPAD Session','2018-01-26');
