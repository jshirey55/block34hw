import express from "express";
import employeeRouter from "#api/employees"
const app = express();

app.use(express.json()); // This is critical for req.body to work

app.use("/", employeeRouter);

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("Something went wrong")
})

export default app;


