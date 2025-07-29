import express from "express";
const router = express.Router();

import { getEmployees,
         getEmployee,  
         createEmployee, 
         deleteEmployee, 
         updateEmployee 
    } from "#db/queries/employees";

    router
        .route("/")
        .get(async (req, res) => {
            const employees = await getEmployees()
            res.send(employees)
        })
        .post(async (req, res) => {
            if(!req.body) return res.status(400).send("Request must have a body")
            
            const { name, birthday, salary } = req.body;
            if (!name || !birthday || !salary)
                return res.status(400).send("REQ must have name, bday, salary")

            const employee = await createEmployee({ name, birthday, salary })
            res.status(201).send(employee)
        })

    router.param("id", async (req, res, next, id) => {
        if (!/^\d+$/.test(id))
            return res.status(400).send("ID must be positive int.")

        const employee = await getEmployee(id)
        if(!employee) return res.status(404).send("Employee not found")

        req.employee = employee
        next()
    })

    router.route("/:id").get((req, res) => {
        res.send(req.employee)
    })
    .put(async (req, res) => {
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
    .delete(async (req, res) => {
        await deleteEmployee(req.employee.id)
        res.sendStatus(204)
    })

    export default router;