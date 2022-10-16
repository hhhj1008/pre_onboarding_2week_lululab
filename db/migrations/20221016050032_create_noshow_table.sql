-- migrate:up
CREATE TABLE `noshow` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `reservation_id` INT,
  FOREIGN KEY (user_id) REFERENCES reservation_user(id) ON UPDATE CASCADE,
  FOREIGN KEY (reservation_id) REFERENCES reservation_info(id) ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE `noshow`;
