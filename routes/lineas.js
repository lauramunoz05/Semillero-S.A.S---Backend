const { Router } = require('express');
const connection = require('../db/db');
const router = Router();

// Method GET
router.get('/linea-vehiculos', async (req, res) =>{
    try {
        const [result] = await connection.query(`SELECT * FROM linea_vehiculos;`);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }

})

// Method POST
router.post('/linea-vehiculos', async (req, res) =>{
    try {
        const campos = Object.keys(req.body); //para capturar los campos del objeto
        await connection.query(`
                INSERT INTO linea_vehiculos (${campos.join()})
                VALUES(?, ?, ?, ?);
            `, Object.values(req.body)); // para ponerlos valores en los campos que tienen '?'
    
        return res.status(200).json('Se agrego correctamente');
      } catch (error) {
          console.log(error);
          const {id_marca_vehiculos, nombre, descripcion, activo} = req.body;
          let estado, status;
          if(!id_marca_vehiculos || !nombre || !descripcion || !activo){
              status = 405
              estado = "Campos incompletos"
            }else if(nombre){
                status = 400
                estado = "conflict"
            }else{
            status = 500
              estado = "Internal server error!"
            }
          res.status(status).json({ error: estado});
      }

});

// Method DELETE
router.delete('/linea-vehiculos/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await connection.query(`DELETE FROM linea_vehiculos WHERE id = ${id} `);
      res.status(200).json('Registro eliminado correctamente');     
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
});

module.exports = router;