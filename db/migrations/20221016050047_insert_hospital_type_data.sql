-- migrate:up
INSERT INTO hospital_type (type_name) VALUES 
('내과'),
('신경과'),
('외과'),
('정형외과'),
('신경외과'),
('성형외과'),
('산부인과'),
('안과'),
('이비인후과'),
('피부과'),
('비뇨기과'),
('소아청소년과'),
('치과'),
('정신건강의학과'),
('종합병원'),
('한의원');

-- migrate:down
DELETE FROM hospital_type;
