import express from "express";
import employeeRouter from "#api/employees"
const app = express();

app.use(express.json()); 

app.route("/").get((req, res) => {
    res.send('Welcome to the Fullstack Employees API.')
})

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("Something went wrong")
})

export default app;


