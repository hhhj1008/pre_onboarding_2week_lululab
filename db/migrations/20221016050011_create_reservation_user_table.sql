-- migrate:up
CREATE TABLE `reservation_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(255),
  `phone` varchar(255),
  `email` varchar(255)
);

-- migrate:down
DROP TABLE `reservation_user`;
