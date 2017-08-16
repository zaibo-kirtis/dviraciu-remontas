DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `task_order`;
DROP TABLE IF EXISTS `part_order`;
DROP TABLE IF EXISTS `receipt`;
DROP TABLE IF EXISTS `job`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `mechanic`;
DROP TABLE IF EXISTS `advance_payment`;
DROP TABLE IF EXISTS `wage`;
DROP TABLE IF EXISTS `bike`;
DROP TABLE IF EXISTS `client`;
DROP TABLE IF EXISTS `accountant`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `service`;
DROP TABLE IF EXISTS `user_group`;
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
	`id` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `frame_type`
(
	`name` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT ,
	PRIMARY KEY(`id`)
);

CREATE TABLE `order_state`
(
	`name` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `part`
(
	`name` varchar (255),
	`manufacturer` varchar (255),
	`price` double precision,
	`description` varchar (255),
	`warranty_until` date,
	`id` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `receipt_state`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar (255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `sex`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar (255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `task`
(
	`name` varchar (255),
	`price` double precision,
	`description` varchar(255),
	`id` int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `user_group`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar (255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `service`
(
	`name` varchar (255),
	`address` varchar (255),
	`working_hours_start` date,
	`working_hours_end` date,
	`email` varchar (255),
	`phone` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`city_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`city_id`) REFERENCES `city` (`id`)
);

CREATE TABLE `user`
(
	`username` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`password` varchar (255),
	`email` varchar (255),
	`last_logged_in` date,
	`user_group_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`user_group_id`) REFERENCES `user_group` (`id`)
);

CREATE TABLE `accountant`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`specialization` varchar (255),
	`date_hired` date,
	`phone` varchar (255),
	`email` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`user_id`),
	FOREIGN KEY(`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `client`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`email` varchar (255),
	`phone` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`address` varchar (255),
	`age` int,
	`date_registered` date,
	`sex_id` int,
	`user_id` int NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`user_id`),
	FOREIGN KEY(`sex_id`) REFERENCES `sex` (`id`),
	FOREIGN KEY(`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `bike`
(
	`frame_number` numeric (20),
	`description` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`color` varchar (255),
	`wheel_radius` double precision,
	`brand` varchar (255),
	`model` varchar (255),
	`frame_type_id` int NOT NULL,
	`client_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`frame_type_id`) REFERENCES `frame_type` (`id`),
	FOREIGN KEY(`client_id`) REFERENCES `client` (`id`)
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
	`id` int NOT NULL AUTO_INCREMENT,
	`accountant_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`accountant_id`) REFERENCES `accountant` (`id`)
);

CREATE TABLE `advance_payment`
(
	`sum` double precision,
	`date` date,
	`comment` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`wage_id` int NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`wage_id`),
	FOREIGN KEY(`wage_id`) REFERENCES `wage` (`id`)
);

CREATE TABLE `mechanic`
(
	`first_name` varchar (255),
	`last_name` varchar (255),
	`work_hours_count` int,
	`specialization` varchar (255),
	`date_hired` date,
	`phone` varchar (255),
	`email` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`service_id` int,
	`wage_id` int NOT NULL,
	PRIMARY KEY(`id`),
	UNIQUE(`user_id`),
	FOREIGN KEY(`user_id`) REFERENCES `user` (`id`),
	FOREIGN KEY(`service_id`) REFERENCES `service` (`id`),
	FOREIGN KEY(`wage_id`) REFERENCES `wage` (`id`)
);

CREATE TABLE `order`
(
	`comment` varchar (255),
	`urgent` boolean,
	`date_created` date,
	`id` int NOT NULL AUTO_INCREMENT,
	`service_id` int,
	`bike_id` int,
	`order_state_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`service_id`) REFERENCES `service` (`id`),
	FOREIGN KEY(`bike_id`) REFERENCES `bike` (`id`),
	FOREIGN KEY(`order_state_id`) REFERENCES `order_state` (`id`)
);

CREATE TABLE `job`
(
	`start` date,
	`work_window_count` int,
	`id` int NOT NULL AUTO_INCREMENT,
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
	`id` int NOT NULL AUTO_INCREMENT,
	`receipt_state_id` int NOT NULL,
	`order_id` int NOT NULL,
	`client_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`receipt_state_id`) REFERENCES `receipt_state` (`id`),
	FOREIGN KEY(`order_id`) REFERENCES `order` (`id`),
	FOREIGN KEY(`client_id`) REFERENCES `client` (`id`)
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

CREATE TABLE `payment`
(
	`sum` double precision,
	`date` date,
	`comment` varchar (255),
	`id` int NOT NULL AUTO_INCREMENT,
	`receipt_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`receipt_id`) REFERENCES `receipt` (`id`)
);

INSERT INTO `frame_type` (`name`) VALUES
    ('Plienas'),
    ('Aliuminis'),
    ('Titanas'),
    ('Anglies pluostas'),
    ('Termoplastikas'),
    ('Magnis'),
    ('Berilis'),
    ('Bambukas'),
    ('Medis'),
    ('Mišrus');

INSERT INTO `order_state` (`name`) VALUES
    ('Nepradetas'),
    ('Pradetas'),
    ('Baigtas');

INSERT INTO `receipt_state` (`name`) VALUES
    ('Apmoketas'),
    ('Neapmoketas');

INSERT INTO `sex` (`name`) VALUES
    ('Vyras'),
    ('Moteris'),
    ('Kita');

INSERT INTO `user_group` (`name`) VALUES
    ('Admin'),
    ('Mechanic'),
    ('Accountant'),
    ('Client');
