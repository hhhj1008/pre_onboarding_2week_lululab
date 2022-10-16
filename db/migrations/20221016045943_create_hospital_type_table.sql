-- migrate:up
CREATE TABLE `hospital_type` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(255)
);

-- migrate:down
DROP TABLE `hospital_type`;
