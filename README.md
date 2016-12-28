# Car-Sales-Project

Create database Name :carsales

Table:1

Employee Detail Table: 

CREATE TABLE `emp` (
  `eid` int(11) NOT NULL auto_increment,
  `fname` varchar(100) default NULL,
  `lname` varchar(100) default NULL,
  `uname` varchar(100) default NULL,
  `pass` varchar(100) default NULL,
  `mno` varchar(100) default NULL,
  `email` varchar(100) default NULL,
  `addr` varchar(100) default NULL,
  PRIMARY KEY  (`eid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

Table:2

Employee Image Table: 

CREATE TABLE `empimage` (
  `imageId` int(11) NOT NULL auto_increment,
  `image` mediumblob,
  `uname` varchar(100) default NULL,
  PRIMARY KEY  (`imageId`),
  UNIQUE KEY `username` (`uname`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`uname`) REFERENCES `emp` (`uname`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1

Table:3

CREATE TABLE `cardetail` (
`cid` int(11) NOT NULL default '0',
`cno` varchar(100) default NULL,
`cname` varchar(100) default NULL,
`color` varchar(100) default NULL,
`cost` varchar(100) default NULL,
PRIMARY KEY  (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `carimage` (
`imgId` int(11) NOT NULL auto_increment,
`img` mediumblob,
`cid` int(11) default NULL,
PRIMARY KEY  (`imgId`),
KEY `image_ibfk_2` (`cid`),
CONSTRAINT `image_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `cardetail` (`cid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1
