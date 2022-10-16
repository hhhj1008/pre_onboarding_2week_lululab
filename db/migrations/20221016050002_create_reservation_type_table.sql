-- migrate:up
CREATE TABLE `reservation_type` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(255)
);

-- migrate:down
DROP TABLE `reservation_type`;
