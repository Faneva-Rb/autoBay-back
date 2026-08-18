CREATE OR REPLACE VIEW receptionist_view AS 
SELECT 
	r.salary,
	r.hire_date,
	r.is_active,
	u.name,
	u.first_name,
	u.email,
	u.created_at,
	u.updated_at
FROM "receptionists" r
JOIN "users" u ON r."idUser" = u."id"