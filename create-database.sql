DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `advance_payment`;
DROP TABLE IF EXISTS `task_order`;
DROP TABLE IF EXISTS `part_order`;
DROP TABLE IF EXISTS `wage`;
DROP TABLE IF EXISTS `receipt`;
DROP TABLE IF EXISTS `job`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `mechanic`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `accountant`;
DROP TABLE IF EXISTS `bike`;
DROP TABLE IF EXISTS `service`;
DROP TABLE IF EXISTS `client`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `task`;
DROP TABLE IF EXISTS `sex`;
DROP TABLE IF EXISTS `receipt_state`;
DROP TABLE IF EXISTS `part`;
DROP TABLE IF EXISTS `order_state`;
DROP TABLE IF EXISTS `frame_type`;
DROP TABLE IF EXISTS `city`;

CREATE TABLE `city`
(
	`name` varchar (255),
	`id` int AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `frame_type`
(
	`name` varchar (255),
	`id` int AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `order_state`
(
	`name` varchar (255),
	`id` int AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `part`
(
	`name` varchar (255),
	`manufacturer` varchar (255),
	`price` double precision,
	`description` varchar (255),
	`warranty_until` date,
	`id` int AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `receipt_state`
(
	`id` int AUTO_INCREMENT,
	`name` varchar (255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `sex`
(
	`id` int AUTO_INCREMENT,
	`name` varchar (255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `task`
(
	`name` varchar(255),
	`price` double,
	`description` varchar(255),
	`id` int AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `client`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`phone` varchar (255),
	`id` int AUTO_INCREMENT,
	`address` varchar (255),
	`sex` int,
	`date_registered` date,
	`birthdate` date,
	`date_modified` date,
	`sex_id` int,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`sex_id`) REFERENCES `sex` (`id`)
);

CREATE TABLE `service`
(
	`name` varchar (255),
	`address` varchar (255),
	`working_hours_start` time,
	`working_hours_end` time,
	`email` varchar (255),
	`phone` varchar (255),
	`id` int AUTO_INCREMENT,
	`city_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`city_id`) REFERENCES `city` (`id`)
);

CREATE TABLE `bike`
(
	`frame_number` numeric (20),
	`description` varchar (255),
	`id` int AUTO_INCREMENT,
	`color` varchar (255),
	`wheel_radius` double precision,
	`brand` varchar (255),
	`model` varchar (255),
	`date_added` date,
	`client_id` int NOT NULL,
	`frame_type_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`client_id`) REFERENCES `client` (`id`),
	FOREIGN KEY(`frame_type_id`) REFERENCES `frame_type` (`id`)
);

CREATE TABLE `accountant`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`specialization` varchar (255),
	`date_hired` date,
	`phone` varchar (255),
	`email` varchar (255),
	`id` int AUTO_INCREMENT,
	`birthdate` date,
	`date_modified` date,
	`sex_id` int,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`sex_id`) REFERENCES `sex` (`id`)
);

CREATE TABLE `admin`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`phone` varchar (255),
	`address` varchar (255),
	`birthdate` date,
	`id` int AUTO_INCREMENT,
	`sex_id` int,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`sex_id`) REFERENCES `sex` (`id`)
);

CREATE TABLE `mechanic`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`work_hours_count` int,
	`specialization` varchar (255),
	`date_hired` date,
	`phone` varchar (255),
	`id` int AUTO_INCREMENT,
	`birthdate` date,
	`date_modified` date,
	`service_id` int,
	`sex_id` int,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`service_id`) REFERENCES `service` (`id`),
	FOREIGN KEY(`sex_id`) REFERENCES `sex` (`id`)
);

CREATE TABLE `user`
(
	`username` varchar (255),
	`id` int AUTO_INCREMENT,
	`password` varchar (255),
	`email` varchar (255),
	`last_logged_in` date,
	`date_registered` date,
	`client_id` int,
	`admin_id` int,
	`mechanic_id` int,
	`accountant_id` int,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`client_id`) REFERENCES `client` (`id`),
	FOREIGN KEY(`admin_id`) REFERENCES `admin` (`id`),
	FOREIGN KEY(`mechanic_id`) REFERENCES `mechanic` (`id`),
	FOREIGN KEY(`accountant_id`) REFERENCES `accountant` (`id`)
);

CREATE TABLE `order`
(
	`comment` varchar (255),
	`urgent` boolean,
	`date_created` date,
	`id` int AUTO_INCREMENT,
	`date_modified` date,
	`bike_id` int,
	`service_id` int,
	`order_state_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`bike_id`) REFERENCES `bike` (`id`),
	FOREIGN KEY(`service_id`) REFERENCES `service` (`id`),
	FOREIGN KEY(`order_state_id`) REFERENCES `order_state` (`id`)
);

CREATE TABLE `job`
(
	`start` date,
	`work_window_count` int,
	`id` int AUTO_INCREMENT,
	`order_id` int,
	`mechanic_id` int,
	PRIMARY KEY(`id`),
	UNIQUE(`order_id`),
	FOREIGN KEY(`order_id`) REFERENCES `order` (`id`),
	FOREIGN KEY(`mechanic_id`) REFERENCES `mechanic` (`id`)
);

CREATE TABLE `receipt`
(
	`sum` double precision,
	`date_created` date,
	`date_to_be_paid` date,
	`comment` varchar (255),
	`id` int AUTO_INCREMENT,
	`order_id` int NOT NULL,
	`client_id` int NOT NULL,
	`receipt_state_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`order_id`) REFERENCES `order` (`id`),
	FOREIGN KEY(`client_id`) REFERENCES `client` (`id`),
	FOREIGN KEY(`receipt_state_id`) REFERENCES `receipt_state` (`id`)
);

CREATE TABLE `wage`
(
	`sum` double precision,
	`work_hours` int,
	`deductables` double precision,
	`pvm` double precision,
	`comment` varchar (255),
	`penalty` double precision,
	`date_confirmed` date,
	`id` int AUTO_INCREMENT,
	`accountant_id` int NOT NULL,
	`mechanic_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`accountant_id`) REFERENCES `accountant` (`id`),
	FOREIGN KEY(`mechanic_id`) REFERENCES `mechanic` (`id`)
);

CREATE TABLE `part_order`
(
	`part_id` int,
	`order_id` int,
	PRIMARY KEY(`part_id`, `order_id`),
	FOREIGN KEY(`part_id`) REFERENCES `part` (`id`),
	FOREIGN KEY(`order_id`) REFERENCES `order` (`id`)
);

CREATE TABLE `task_order`
(
	`task_id` int,
	`order_id` int,
	PRIMARY KEY(`task_id`, `order_id`),
	FOREIGN KEY(`task_id`) REFERENCES `task` (`id`),
	FOREIGN KEY(`order_id`) REFERENCES `order` (`id`)
);

CREATE TABLE `advance_payment`
(
	`sum` double precision,
	`date` date,
	`comment` varchar (255),
	`id` int AUTO_INCREMENT,
	`wage_id` int NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`wage_id`),
	FOREIGN KEY(`wage_id`) REFERENCES `wage` (`id`)
);

CREATE TABLE `payment`
(
	`sum` double precision,
	`date` date,
	`comment` varchar (255),
	`id` int AUTO_INCREMENT,
	`receipt_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`receipt_id`) REFERENCES `receipt` (`id`)
);