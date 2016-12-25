# Car-Sales-Project

Create database Name :carsales

Table:1

CREATE TABLE `employee` (
`eId` int(11) NOT NULL default '0',
`userName` varchar(100) default NULL,
`password` varchar(100) default NULL,
`phoneNumber` varchar(100) default NULL,
`email` varchar(100) default NULL,
`Address` varchar(255) default NULL,
PRIMARY KEY  (`eId`),
UNIQUE KEY `userName` (`userName`)
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