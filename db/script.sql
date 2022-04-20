/* Creacion de la base de datos y tablas */
CREATE DATABASE semillero_sas;

USE semillero_sas;

DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS linea_vehiculos;
DROP TABLE IF EXISTS marca_vehiculos;

CREATE TABLE marca_vehiculos(
    id INT  UNSIGNED AUTO_INCREMENT,
    nombre VARCHAR(20) UNIQUUE NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    activo ENUM('S', 'N') NOT NULL,
    CONSTRAINT `pk_id_marca_vehiculos` PRIMARY KEY(id)
);

ALTER TABLE marca_vehiculos ADD CONSTRAINT `uq_nombre_marca_vehiculo` UNIQUE(nombre);

CREATE TABLE linea_vehiculos(
    id INT UNSIGNED AUTO_INCREMENT,
    id_marca_vehiculos INT UNSIGNED NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    activo ENUM('S', 'N') NOT NULL,
    CONSTRAINT `pk_id_linea_vehiculos` PRIMARY KEY(id),
    CONSTRAINT `fk_marca_vehiculos` FOREIGN KEY(id_marca_vehiculos) REFERENCES marca_vehiculos(id)
);

ALTER TABLE linea_vehiculos ADD CONSTRAINT `uq_nombre_linea_vehiculo` UNIQUE(nombre);

CREATE TABLE vehiculos(
    placa VARCHAR(10),
    id_linea_vehiculos INT UNSIGNED NOT NULL,
    modelo  VARCHAR(30) NOT NULL,
    fecha_vencimiento_seguro DATE NOT NULL,
    fecha_vencimiento_tecnomecanica DATE NOT NULL,
    CONSTRAINT `pk_placa_vehiculos` PRIMARY KEY(placa),
    CONSTRAINT `fk_linea_vehiculos` FOREIGN KEY(id_linea_vehiculos) REFERENCES linea_vehiculos(id)
);



/* SERVICIOS */

-- Un servicio que indique cuál es el modelo máximo almacenado y el mínimo.
            SELECT COUNT(placa), modelo
            FROM vehiculos
            GROUP BY modelo
            HAVING COUNT(placa) > 1
            LIMIT 1;

    -- Modelo minimo almacenado
            SELECT COUNT(placa), modelo
            FROM vehiculos
            GROUP BY modelo
            HAVING COUNT(placa) < 2
            LIMIT 1;

-- Un servicio que me permita consultar todos los vehículos por un rango de fechas sobre el campo FECHA_VEN_SEGURO.
        SELECT * FROM vehiculos 
        WHERE fecha_vencimiento_seguro 
        BETWEEN '2022-08-25' AND '2022-09-28';

-- Un servicio que me permita saber cuál es el modelo máximo almacenado y el mínimo.
    -- Modelo maximo almacenado
        SELECT COUNT(placa), modelo
        FROM vehiculos
        GROUP BY modelo;

-- Un servicio que me permita consultar todos los vehículos por un rango de modelos por el campo modelo.
    SELECT * FROM vehiculos 
    WHERE modelo
    BETWEEN '2017' AND '2019';

-- Un servicio que me permita realizar una consulta única que tenga las siguientes columnas: NRO_PLACA, MODELO, DESC_LINEA, DESC_MARCA; traer todos los registros de la tabla donde almacenes los vehículos que se encuentren en el estado S en el campo activo de la tabla donde se almacene las líneas.
        SELECT vehiculos.placa, vehiculos.modelo, linea_vehiculos.descripcion, marca_vehiculos.descripcion
        FROM((vehiculos
        INNER JOIN linea_vehiculos ON vehiculos.id_linea_vehiculos = linea_vehiculos.id)
        INNER JOIN marca_vehiculos ON linea_vehiculos.id_marca_vehiculos = marca_vehiculos.id);

    -- Vehiculos que la linea se encuentre activa
            SELECT linea_vehiculos.activo, vehiculos.placa, vehiculos.id_linea_vehiculos, vehiculos.modelo, vehiculos.fecha_vencimiento_seguro, fecha_vencimiento_tecnomecanica 
            FROM(vehiculos
            INNER JOIN linea_vehiculos ON vehiculos.id_linea_vehiculos = linea_vehiculos.id)
            WHERE linea_vehiculos.activo = 1;


-- Un servicio que me permita sumar todos los modelos.
    SELECT SUM(modelo)
    FROM vehiculos;

-- Un servicio que me permita promediar todos los modelos.
    SELECT AVG(modelo)
    FROM vehiculos;

-- Un servicio que me permita realizar una única consulta para saber cuántos registros están activos e inactivos de la tabla donde se almacenan las líneas
    --Activo
    SELECT COUNT(activo)
    FROM linea_vehiculos
    WHERE activo = 1;

    --Inactivo
        SELECT COUNT(activo)
        FROM linea_vehiculos
        WHERE activo = 2;
