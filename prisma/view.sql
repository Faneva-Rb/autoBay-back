CREATE VIEW mechanic_view AS 
SELECT 
	m.id as mechanic_id,
	m.speciality ,
	m.salary,
	m.is_available,
	m.hire_date,
	m.phone,
	u.name,
	u.first_name,
	u.email,
	u.id as user_id,
    u.created_at,
    u.updated_at
FROM "mechanics" m
JOIN "users" u ON m."idUser" = u."id"