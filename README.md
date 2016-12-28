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

CREATE TABLE `image` (
`imageId` int(11) NOT NULL auto_increment,
`image` mediumblob,
`eId` int(100) default NULL,
PRIMARY KEY  (`imageId`),
UNIQUE KEY `empId` (`eId`),
CONSTRAINT `image_ibfk_1` FOREIGN KEY (`eId`) REFERENCES `employee` (`eId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1

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
