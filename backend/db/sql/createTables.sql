CREATE TABLE IF NOT EXISTS "cafes" (
	"cafe_id"	VARCHAR,
	"cafe_name"	VARCHAR,
	"description"	VARCHAR,
	"location"	VARCHAR
);

CREATE TABLE IF NOT EXISTS "employees" (
	"employee_id"	VARCHAR,
	"name"	VARCHAR,
	"gender"	VARCHAR,
	"email"	VARCHAR,
	"phone"	VARCHAR,
	"join_date"	DATE,
	"cafe_id"	VARCHAR
);