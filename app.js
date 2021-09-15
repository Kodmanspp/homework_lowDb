const cors = require("cors");
const uuid = require("uuid");
const express = require('express');


const { inventory, data } = require("./db/inventory.js");
const { trainers, dataTrain } = require("./db/Trainers.js");
const app = express();
const port = 3000;
const { initDb } = require("./db/index");

app.use(cors());
app.use(express.json());

initDb.read();
initDb.defaults(data).write();
initDb.defaults(dataTrain).write();

app.get('/inventory', (req, res) => {
    const inventory = initDb.get("inventory");
    res.send(inventory);

    // res.send(data);
})
app.get('/inventory/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id.length < 5)
        res.status(404).json(
            {
                errorCode: "invalid_Request",
                errorString: "Неверные параметры"
            }
        );
    const item = initDb.get("inventory").find(item => item.id === id);

    if (!item) {
        res.status(404).json({
            errorCode: "invalid_NOT_FOUND",
            errorString: "Предмет не faund"
        })
    }
    else {
        res.send(item);
    }

})
app.get('/trainers', (req, res) => {
    const trainers = initDb.get("trainers");
    res.send(trainers);
})
app.get('/trainers/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id.length < 5)
        res.status(404).json(
            {
                errorCode: "invalid_Request",
                errorString: "Неверные параметры"
            }
        );
    const item = initDb.get("trainers").find(item => item.id === id);

    if (!item) {
        res.status(404).json({
            errorCode: "invalid_NOT_FOUND",
            errorString: "Предмет не faund"
        })
    }
    else {
        res.send(item);
    }

})


app.put("/inventory/edit/:id", (req, res) => {


    try {
        const { id } = req.params;
        const body = req.body;
        

        const item = initDb.get("inventory").find(item => item.id === id).value();

        const {
            name,
            isInGoodContion,
            quantuty,
            weight,
            producedBy
        } = body;

        if(typeof name !== "string") thri
        const updatedItem = { ...item, ...body}

        initDb.get("inventory").find({id}).assign(updatedItem).write(); 
        res.send(updatedItem); 

    } catch (error) {
        res.status(500).json({
            errorCode: "INTERNAL_SERVER_ERROR",
            errorString: "Внутреняя ошибка сервиса!"
        })
    }
})


app.post("/inventory/create", (req, res) => {
    const body = req.body;
    try {
        const {
            name,
            isInGoodContion,
            quantuty,
            weight,
            producedBy
        } = body;

        const newObj = {
            id: uuid.v4(),
            name,
            isInGoodContion,
            quantuty,
            weight,
            producedBy
        }
        initDb.get("inventory").push(newObj).write();
        res.send(newObj);
    } catch (error) {
        res.status(500).json({
            errorCode: "INTERNAL_SERVER_ERROR",
            errorString: "Внутреняя ошибка сервиса!"
        })
    }


})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
