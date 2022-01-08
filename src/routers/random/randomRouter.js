const express = require('express');
const { fork } = require('child_process');

const DEFAULT_CANT = 100000000;

const randomRouter = express.Router();

randomRouter.get('/', (req, res) => {
    const { cant = DEFAULT_CANT } = req.query;

    const computo = fork('./src/utils/random/countRandom.js');

    computo.on('message', msg => {
        if (msg == 'listo') {
            computo.send(cant)
        } else {
            res.send(msg)
        }
    });
});

module.exports = randomRouter;