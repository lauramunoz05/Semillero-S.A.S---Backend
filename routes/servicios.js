const { Router } = require('express');
const connection = require('../db/db');
const router = Router();

// Modelo maximo almacenado
router.get('/modelo-maximo-almacenado', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT COUNT(placa), modelo
            FROM vehiculos
            GROUP BY modelo
            HAVING COUNT(placa) > 1
            LIMIT 1;
        `);
        return res.status(200).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Modelo minimo almacenado

router.get('/modelo-minimo-almacenado', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT COUNT(placa), modelo
            FROM vehiculos
            GROUP BY modelo
            HAVING COUNT(placa) < 2
            LIMIT 1;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta por rango de fecha de vencimiento del seguto
router.get('/rango-fecha-ven-seguro', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT * FROM vehiculos 
            WHERE fecha_vencimiento_seguro 
            BETWEEN '2022-08-25' AND '2022-09-28';
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// modelo maximo almacenado y el minimo
router.get('/modelo-maximo-minimo', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT COUNT(placa), modelo
            FROM vehiculos
            GROUP BY modelo;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta por rango de modelo
router.get('/rango-modelo', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT * FROM vehiculos 
            WHERE modelo
            BETWEEN '2017' AND '2019';
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta placa, mdelo, descripcion de linea y descripcion de modelo
router.get('/placa-modelo-descripcion-line-modelo', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT vehiculos.placa, vehiculos.modelo, linea_vehiculos.descripcion, marca_vehiculos.descripcion
            FROM((vehiculos
            INNER JOIN linea_vehiculos ON vehiculos.id_linea_vehiculos = linea_vehiculos.id)
            INNER JOIN marca_vehiculos ON linea_vehiculos.id_marca_vehiculos = marca_vehiculos.id);
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta de vehiculos que la linea se encuentre activa
router.get('/vehiculos-lineas-activas', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT linea_vehiculos.activo, vehiculos.placa, vehiculos.id_linea_vehiculos, vehiculos.modelo, vehiculos.fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica 
            FROM(vehiculos
            INNER JOIN linea_vehiculos ON vehiculos.id_linea_vehiculos = linea_vehiculos.id)
            WHERE linea_vehiculos.activo = 1;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta de vehiculos con el nombre de lamarca y el nombre de la linea
router.get('/vehiculos-nombre-marca-nombre-linea', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT vehiculos.placa, marca_vehiculos.nombre, linea_vehiculos.nombre, vehiculos.modelo, vehiculos.fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica 
            FROM((vehiculos
            INNER JOIN linea_vehiculos ON vehiculos.id_linea_vehiculos = linea_vehiculos.id)
            INNER JOIN marca_vehiculos ON linea_vehiculos.id_marca_vehiculos = marca_vehiculos.id);
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta de cantidad de lineas activas
router.get('/cantidad-lineas-activas', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT COUNT(activo)
            FROM linea_vehiculos
            WHERE activo = 1;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Suma de todos los modelos
router.get('/cantidad-lineas-activas', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT SUM(modelo)
            FROM vehiculos;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Promedio de todos los modelos
router.get('/cantidad-lineas-activas', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT AVG(modelo)
            FROM vehiculos;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Consulta de cantidad de lineas inactivas
router.get('/cantidad-lineas-activas', async (req, res) => {
    try {
        const [result] = await connection.query(`
            SELECT COUNT(activo)
            FROM linea_vehiculos
            WHERE activo = 2;
        `);
        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})



module.exports = router