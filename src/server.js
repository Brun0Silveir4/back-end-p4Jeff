require("dotenv").config();
const express = require("express");
const router = require('./routes')
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});