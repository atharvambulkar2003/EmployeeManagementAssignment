var express = require('express');
const { verifyAdmin,findAllEmployee,deleteEmployeeById,updateEmployeeProfile } = require('../dao/EmployeeDao');
var EmployeeRouter = express.Router();

EmployeeRouter.post('/login',async function(req, res, next) {
    const {username,password} = req.body;
    const result = await verifyAdmin(username,password);
    return res.json(result);
});

EmployeeRouter.get('/findAll/employee',async function(req, res, next) {
    const result = await findAllEmployee();
    return res.json(result);
});

EmployeeRouter.delete("/delete/employee/:id",async function (req,res,next) {
    const id = req.params.id;
    const result = await deleteEmployeeById(id);
    return res.json(result);
})

EmployeeRouter.put("/update/employee/:id", async function (req, res, next) {
    const {id} = req.params;
    const {name,email} = req.body;
    const result = await updateEmployeeProfile(id, name, email);
    res.json(result);
});

module.exports = EmployeeRouter;