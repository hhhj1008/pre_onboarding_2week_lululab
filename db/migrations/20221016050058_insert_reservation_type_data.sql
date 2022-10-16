-- migrate:up
INSERT INTO reservation_type (type_name) VALUES 
('진료'),
('검진'),
('입원'),
('처방');

-- migrate:down
DELETE FROM reservation_type;
