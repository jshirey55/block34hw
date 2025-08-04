import express from "express";
const router = express.Router();

import {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";

// Middleware to validate and load employee by ID
router.param("id", async (req, res, next, id) => {
     if (!/^\d+$/.test(id))
            return res.status(400).send("ID must be positive int.")

        const employee = await getEmployee(id)
        if(!employee) return res.status(404).send("Employee not found")

        req.employee = employee
        next()
    })

// GET /
router.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// GET /employees
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/employees", async (req, res, next) => {
  if(!req.body) return res.status(400).send("Request must have a body")
            
            const { name, birthday, salary } = req.body;
            if (!name || !birthday || !salary)
                return res.status(400).send("REQ must have name, bday, salary")

            const employee = await createEmployee({ name, birthday, salary })
            res.status(201).send(employee)
        })

// GET /employees/:id
router.get("/employees/:id", (req, res) => {
  res.status(200).json(req.employee);
});

// PUT /employees/:id
router.put('/employees/:id', async (req, res) => {
        if (!req.body) return res.status(400).json("REQ must have body")
        const { name, birthday, salary } = req.body
        if (!name || !birthday || !salary)
            return res.status(400).send("REQ body must have name, bday, salary")
        const employee = await updateEmployee({
            id: req.employee.id,
            name,
            birthday,
            salary,
        })
        res.send(employee)
    })

// DELETE /employees/:id
router.delete("/employees/:id", async (req, res, next) => {
  try {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;