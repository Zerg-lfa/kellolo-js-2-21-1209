const basket = require('./services/basket.js');
const writer = require('./utils/writer.js');

const express = require('express');
const fs = require('fs');
const server = express();
server.use(express.json());

// server.use('/', express.static('./public'));

server.get('/catalog', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/db/catalog.json', 'utf-8'));
    res.json(data);
});

server.get('/basket', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/db/basket.json', 'utf-8'));
    res.json(data);
})

server.post('/basket', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/db/basket.json', 'utf-8'));

    //data.content.push(req.body)
    let newBasket = basket.add(data, req.body);

    writer('./server/db/basket.json', newBasket)
        .then(status => {
            if (status) {
                res.json({ status: true })
            } else {
                // res.json({ status: false }) //200 OK {status: false} - not good
                res.sendStatus(500) //500 - internal Server err 
            }
        })
})

server.put('/basket/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/db/basket.json', 'utf-8'));

    let newBasket = basket.change(data, req.params.id, req.body.amount);
    writer('./server/db/basket.json', newBasket)
        .then(status => {
            if (status) {
                res.json({ status: true })
            } else {
                // res.json({ status: false }) //200 OK {status: false} - not good
                res.sendStatus(500) //500 - internal Server err 
            }
        })
})

server.delete('/basket/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./server/db/basket.json', 'utf-8'));

    let newBasket = basket.delete(data, req.params.id);
    writer('./server/db/basket.json', newBasket)
        .then(status => {
            if (status) {
                res.json({ status: true })
            } else {
                // res.json({ status: false }) //200 OK {status: false} - not good
                res.sendStatus(500) //500 - internal Server err 
            }
        })
})

server.listen(3000);