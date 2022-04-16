const { Router } = require('express');
const connection = require('../db/db');
const router = Router();

// Method GET
router.get('/marca-vehiculos', async (req, res) =>{
    try {
        const [result] = await connection.query(`SELECT * FROM marca_vehiculos;`);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }

})

// Method POST
router.post('/marca-vehiculos', async (req, res) =>{
    try {
        const campos = Object.keys(req.body); //para capturar los campos del objeto
        await connection.query(`
                INSERT INTO marca_vehiculos (${campos.join()}) 
                VALUES(?, ?, ?);
            `, Object.values(req.body)); // para ponerlos valores en los campos que tienen '?'
    
        return res.status(200).json('Se agrego correctamente');
      } catch (error) {
          console.log(error);
          const {nombre, descripcion, activo} = req.body;
          let estado, status;
          if(!nombre || !descripcion || !activo){
            status = 405
            estado = "Campos incompletos"
          }else if(nombre){
          status = 400
          estado = "Esta marca ya se encuentra registrada"
        }else{
            status = 500
              estado = "Internal server error!"
        }
          res.status(status).json({ error: estado});
      }

});

// Method PATH
router.patch("/marca-vehiculos/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const fields = Object.keys(req.body);
      const fieldsQuery = fields.map(field => {
        if(typeof req.body[`${field}`] === 'string'){
          return `${field} = '${req.body[`${field}`]}'`;
        }else{
          return `${field} = ${req.body[`${field}`]}`;
        }
      });
  
      await connection.query(`UPDATE marca_vehiculos SET ${fieldsQuery.join()} WHERE id = ${id}`);
      res.status(200).json('El campo se actualizo correctamente');
  
    } catch (error) {
        const {nombre, activo} = req.body;
        let estado, status;
        if(nombre){
            status = 400;
            estado = "Esta marca ya se encuentra registrada";
        }else if(activo !== "N" || activo !== "S"){
            status = 404;
            estado = "El campo activo solo puede ser 'S' o 'N'";
        }else{
            status = 500;
            estado = "Internal server error!";
        }
      console.log(error);
      res.status(status).json({ error: estado});
    }
  });

// Method DELETE
router.delete('/marca-vehiculos/:id', async (req, res) => {
    try {
      const {id} = req.params;
      await connection.query(`DELETE FROM marca_vehiculos WHERE id = ${id} `);
      res.status(200).json('Registro eliminado correctamente');
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
});

module.exports = router;