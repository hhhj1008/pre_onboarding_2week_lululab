-- migrate:up
CREATE TABLE `reservation_info` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `reservation_number` int,
  `hospital_id` int,
  `user_id` int,
  `reservation_time` varchar(255),
  `reservation_type_id` int,
  `is_visit` TINYINT,
  create_at DATETIME DEFAULT NOW(),
  update_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES reservation_user(id) ON UPDATE CASCADE,
  FOREIGN KEY (reservation_type_id) REFERENCES reservation_type(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE `reservation_info`;
