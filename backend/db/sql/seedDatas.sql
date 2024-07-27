-- Seeds Cafes table
INSERT INTO "main"."cafes" ("cafe_id", "cafe_name", "description", "location") VALUES ('3a13037c-9682-46a9-84bf-deb89a23acf9', 'ChangiCafe', 'Cafe located at changi airport', 'Changi Airport');
INSERT INTO "main"."cafes" ("cafe_id", "cafe_name", "description", "location") VALUES ('0f24c3e2-8c76-455d-8d7c-cbfcf7d9cfe0', 'Raffles', 'Cafe located at raffles place', 'Raffles Place');
INSERT INTO "main"."cafes" ("cafe_id", "cafe_name", "description", "location") VALUES ('2b18ff77-048a-4294-9910-57ca4a5be680', 'TuasCafe', 'Cafe located at Tuas', 'Tuas');

-- Seeds Employees table
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI6894313', 'Alex Kim', 'Male', 'alex@gmail.com', '88888881', '2022-07-27', '0f24c3e2-8c76-455d-8d7c-cbfcf7d9cfe0');
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI9697529', 'Emma Lum', 'Female', 'Emma.oliver@gmail.com', '98740493', '2015-12-15', '0f24c3e2-8c76-455d-8d7c-cbfcf7d9cfe0');
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI5435949', 'Amelia', 'Female', 'amelia.lim@gmail.com', '98740492', '2016-02-17', '2b18ff77-048a-4294-9910-57ca4a5be680');
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI1403332', 'Andrew Soh', 'Male', 'alex.soh@gmail.com', '88888882', '2024-04-10', '3a13037c-9682-46a9-84bf-deb89a23acf9');
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI3498608', 'Steve Ling', 'Male', 'steve.ling@gmail.com', '88888883', '2023-07-27', '3a13037c-9682-46a9-84bf-deb89a23acf9');
INSERT INTO "main"."employees" ("employee_id", "name", "gender", "email", "phone", "join_date", "cafe_id") VALUES ('UI5734270', 'Olivia', 'Female', 'olivia.noah@gmail.com', '98740491', '2020-02-12', '3a13037c-9682-46a9-84bf-deb89a23acf9');
