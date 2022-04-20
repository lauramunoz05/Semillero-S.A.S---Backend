const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes 
app.get('', (req, res) => {
    res.send(`<h1>Sprint 01 - backend</h1> <p>Semillero S.A.S</p>`)
});

app.use('/api/', require('./routes/vehiculos'));
app.use('/api/', require('./routes/marcas'));
app.use('/api/', require('./routes/lineas'));
app.use('/api/', require('./routes/servicios'));

// Port
app.set('port', process.env.PORT || 550);

app.listen(app.get('port'), () => {
    console.log(`The server is running on the port ${app.get('port')}`);
})