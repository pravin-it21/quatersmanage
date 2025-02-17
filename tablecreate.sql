use quatersDB;

DROP TABLE IF EXISTS  visitors;
DROP TABLE IF EXISTS  vehicles;
DROP TABLE IF EXISTS  complaintdb;
DROP TABLE IF EXISTS  events;
DROP TABLE IF EXISTS  relation;
DROP TABLE IF EXISTS  service;
DROP TABLE IF EXISTS  bills;
DROP TABLE IF EXISTS  housekeeping;

DROP TABLE IF EXISTS flatdb;
DROP TABLE IF EXISTS  userdb;

CREATE TABLE userdb (
    userid INT(4) AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    mobile VARCHAR(10),
    role VARCHAR(255),
    PRIMARY KEY (userid)
) AUTO_INCREMENT=1001;


CREATE TABLE flatdb (
    flatid INT(4) AUTO_INCREMENT,
    blockno INT(2),
    flatno INT(4),
    tenantid INT(4),
    bhk INT(2),
    sqft INT,
    PRIMARY KEY (flatid),
    FOREIGN KEY (tenantid) REFERENCES userdb(userid)
) AUTO_INCREMENT=2001;


CREATE TABLE complaintdb (
    complaintid INT(4) AUTO_INCREMENT,
    complaint VARCHAR(255),
    action VARCHAR(255),
    userid INT(4),
    flatno INT(4),
    PRIMARY KEY (complaintid),
    FOREIGN KEY (userid) REFERENCES userdb(userid)
) AUTO_INCREMENT=4001;

create table relation(
	role varchar(20),
	service_id integer(4),
	constraint Pk_relation primary key(role,service_id)
);

CREATE TABLE housekeeping (
    servantid INT(4),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    status VARCHAR(255),
    work VARCHAR(255),
    request VARCHAR(255),
    PRIMARY KEY (servantid)
);

create table service(
    service_id integer(4),
    service_name varchar(255),
    service_desc varchar(255),
    primary key(service_id)
);

CREATE TABLE events (
    event_id INT(4) AUTO_INCREMENT,
    event_name VARCHAR(255),
    event_date DATE,
    event_time TIME,
    event_venue VARCHAR(255),
    user INT(4),
    status VARCHAR(20),
    PRIMARY KEY (event_id),
    FOREIGN KEY (user) REFERENCES userdb(userid)
) AUTO_INCREMENT=4001;


CREATE TABLE visitors (
    visitorid int(4) AUTO_INCREMENT,
    first_name varchar(255),
    last_name varchar(255),
    mobile varchar(10),
    visit_date date,
    visit_time time,
    herefor int(4),
    PRIMARY KEY (visitorid),
    FOREIGN KEY (herefor) REFERENCES userdb(userid)
) AUTO_INCREMENT = 2001;

CREATE TABLE vehicles (
    vehicleid INT(4) AUTO_INCREMENT,
    vehicleno VARCHAR(255),
    drivername VARCHAR(255),
    driverno VARCHAR(10),
    visit_date DATE,
    visit_time TIME,
    herefor INT(4),
    PRIMARY KEY (vehicleid),
    FOREIGN KEY (herefor) REFERENCES userdb(userid)
) AUTO_INCREMENT=6001;