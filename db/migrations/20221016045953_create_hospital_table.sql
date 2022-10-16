-- migrate:up
CREATE TABLE `hospital` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `tel` varchar(255),
  `addr` varchar(255),
  `reservation_interval` int,
  `open_time` INT,
  `close_time` INT,
  `lunch_start` INT,
  `lunch_end` INT,
  `type_id` INT,
   FOREIGN KEY (type_id) REFERENCES hospital_type(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE `hospital`;
