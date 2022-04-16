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