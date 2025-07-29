DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
    birthday date NOT NULL,
    salary int NOT NULL
)

