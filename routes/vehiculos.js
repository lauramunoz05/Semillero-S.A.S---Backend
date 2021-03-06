const { Router } = require('express');
const connection = require('../db/db');
const router = Router();

// Method GET
router.get('/vehiculos', async (req, res) =>{
    try {
        const [result] = await connection.query(`SELECT * FROM vehiculos;`);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Method POST
router.post('/vehiculos', async (req, res) =>{
    try {
        const campos = Object.keys(req.body); //para capturar los campos del objeto
        await connection.query(`
        INSERT INTO vehiculos (${campos.join()}) 
        VALUES (?, ?, ?, ?, ?);
            `, Object.values(req.body)); // para ponerlos valores en los campos que tienen '?'
    
        const [result] = await connection.query(`SELECT * FROM vehiculos` );
        return res.status(200).json(result);
      } catch (error) {
          console.log(error);
          const {placa, id_linea_vehiculos, modelo, fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica} = req.body;
          let estado, status;
          if(!placa || !id_linea_vehiculos || !modelo || !fecha_vencimiento_seguro || !fecha_vencimiento_tecnomecanica){
              status = 405
              estado = "Campos incompletos"
        }else{
            status = 500
              estado = "Internal server error!"
        }
          res.status(status).json({ error: estado});
      }
});

// Method PATH
router.patch("/vehiculos/:id", async (req, res) => {
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
  
      await connection.query(`UPDATE vehiculos SET ${fieldsQuery.join()} WHERE placa = '${id}'`);
      const [result] = await connection.query(`SELECT * FROM vehiculos` );
      return res.status(200).json(result);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!"});
    }
});

// Method PUT
// app.put('/vehiculos/:id', (req, res)=>{
//   const {id} = req.params
//   const {placa, id_linea_vehiculos, modelo, fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica} = req.body;
//   let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
//   conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
//       if(error){
//           throw error
//       }else{              
//           res.send(results)
//       }
//   })
// })

// Method DELETE
router.delete('/vehiculos/:placa', async (req, res) => {
    try {
      const {placa} = req.params;
      await connection.query(`DELETE FROM vehiculos WHERE placa = '${placa}' `);
      const [result] = await connection.query(`SELECT * FROM vehiculos`);
      return res.status(200).json(result);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error!" });
    }
});

module.exports = router;