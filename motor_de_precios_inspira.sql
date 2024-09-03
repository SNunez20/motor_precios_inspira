/*
 Navicat Premium Data Transfer

 Source Server         : 1310
 Source Server Type    : MySQL
 Source Server Version : 50714 (5.7.14)
 Source Host           : 192.168.13.10:3306
 Source Schema         : motor_de_precios_inspira

 Target Server Type    : MySQL
 Target Server Version : 50714 (5.7.14)
 File Encoding         : 65001

 Date: 09/08/2024 16:23:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lista_de_precios
-- ----------------------------
DROP TABLE IF EXISTS `lista_de_precios`;
CREATE TABLE `lista_de_precios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lista_de_precios
-- ----------------------------
INSERT INTO `lista_de_precios` VALUES (1, 'Actual Tradicional', 1);
INSERT INTO `lista_de_precios` VALUES (2, 'Inspira SIMC', 1);

-- ----------------------------
-- Table structure for localidades
-- ----------------------------
DROP TABLE IF EXISTS `localidades`;
CREATE TABLE `localidades`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of localidades
-- ----------------------------
INSERT INTO `localidades` VALUES (1, 'Agraciada', 1);
INSERT INTO `localidades` VALUES (2, 'Artilleros', 1);
INSERT INTO `localidades` VALUES (3, 'Barker', 1);
INSERT INTO `localidades` VALUES (4, 'Campana', 1);
INSERT INTO `localidades` VALUES (5, 'Carmelo', 1);
INSERT INTO `localidades` VALUES (6, 'Colonia', 1);
INSERT INTO `localidades` VALUES (7, 'Colonia Valdense', 1);
INSERT INTO `localidades` VALUES (8, 'Conchillas', 1);
INSERT INTO `localidades` VALUES (9, 'Cufré', 1);
INSERT INTO `localidades` VALUES (10, 'Florencio Sánchez', 1);
INSERT INTO `localidades` VALUES (11, 'Juan Lacaze', 1);
INSERT INTO `localidades` VALUES (12, 'La Estanzuela', 1);
INSERT INTO `localidades` VALUES (13, 'La Paz', 1);
INSERT INTO `localidades` VALUES (14, 'Los Pinos', 1);
INSERT INTO `localidades` VALUES (15, 'Miguelete', 1);
INSERT INTO `localidades` VALUES (16, 'Minuano', 1);
INSERT INTO `localidades` VALUES (17, 'Nueva Helvecia', 1);
INSERT INTO `localidades` VALUES (18, 'Nueva Palmira', 1);
INSERT INTO `localidades` VALUES (19, 'Ombúes de Lavalle', 1);
INSERT INTO `localidades` VALUES (20, 'Playa Fomento', 1);
INSERT INTO `localidades` VALUES (21, 'Riachuelo', 1);
INSERT INTO `localidades` VALUES (22, 'Rosario', 1);
INSERT INTO `localidades` VALUES (23, 'Santa Ana', 1);
INSERT INTO `localidades` VALUES (24, 'Tarariras', 1);

-- ----------------------------
-- Table structure for motor
-- ----------------------------
DROP TABLE IF EXISTS `motor`;
CREATE TABLE `motor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_lista_de_precios` int(11) NULL DEFAULT NULL,
  `id_servicio` int(11) NULL DEFAULT NULL,
  `horas` int(11) NULL DEFAULT NULL,
  `edad_desde` int(11) NULL DEFAULT NULL,
  `edad_hasta` int(11) NULL DEFAULT NULL,
  `precio` int(11) NULL DEFAULT NULL,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of motor
-- ----------------------------
INSERT INTO `motor` VALUES (1, 1, 1, 8, 0, 35, 560, 1);
INSERT INTO `motor` VALUES (2, 1, 1, 8, 36, 65, 715, 1);
INSERT INTO `motor` VALUES (3, 1, 1, 8, 66, NULL, 935, 1);
INSERT INTO `motor` VALUES (4, NULL, 2, 8, 0, 35, 560, 1);
INSERT INTO `motor` VALUES (5, NULL, 2, 8, 36, 65, 715, 1);
INSERT INTO `motor` VALUES (6, NULL, 2, 8, 66, NULL, 935, 1);
INSERT INTO `motor` VALUES (7, NULL, 3, 8, NULL, NULL, 530, 1);
INSERT INTO `motor` VALUES (8, NULL, 3, 16, NULL, NULL, 1060, 1);
INSERT INTO `motor` VALUES (9, NULL, 3, 24, NULL, NULL, 1590, 1);
INSERT INTO `motor` VALUES (10, NULL, 4, 8, NULL, NULL, 530, 1);
INSERT INTO `motor` VALUES (11, NULL, 4, 16, NULL, NULL, 1060, 1);
INSERT INTO `motor` VALUES (12, NULL, 4, 24, NULL, NULL, 1590, 1);
INSERT INTO `motor` VALUES (13, NULL, 5, 8, NULL, NULL, 530, 1);
INSERT INTO `motor` VALUES (14, NULL, 5, 16, NULL, NULL, 1060, 1);
INSERT INTO `motor` VALUES (15, NULL, 5, 24, NULL, NULL, 1590, 1);
INSERT INTO `motor` VALUES (16, NULL, 6, 8, NULL, NULL, 530, 1);
INSERT INTO `motor` VALUES (17, NULL, 6, 16, NULL, NULL, 1060, 1);
INSERT INTO `motor` VALUES (18, NULL, 6, 24, NULL, NULL, 1590, 1);
INSERT INTO `motor` VALUES (19, 2, 1, 8, 0, 35, NULL, 0);
INSERT INTO `motor` VALUES (20, 2, 1, 8, 36, 65, NULL, 0);
INSERT INTO `motor` VALUES (21, 2, 1, 8, 66, NULL, NULL, 0);
INSERT INTO `motor` VALUES (22, 2, 1, 8, 0, 35, NULL, 0);
INSERT INTO `motor` VALUES (23, 2, 1, 8, 36, 65, NULL, 0);
INSERT INTO `motor` VALUES (24, 2, 1, 8, 66, NULL, NULL, 0);
INSERT INTO `motor` VALUES (25, 2, 1, 8, 0, 35, NULL, 0);
INSERT INTO `motor` VALUES (26, 2, 1, 8, 36, 65, NULL, 0);
INSERT INTO `motor` VALUES (27, 2, 1, 8, 66, NULL, NULL, 0);
INSERT INTO `motor` VALUES (28, NULL, 7, NULL, NULL, NULL, 115, 1);
INSERT INTO `motor` VALUES (29, NULL, 8, NULL, NULL, NULL, 280, 1);
INSERT INTO `motor` VALUES (30, NULL, 9, 8, 63, 64, 1210, 1);
INSERT INTO `motor` VALUES (31, NULL, 9, 16, 63, 64, 2195, 1);
INSERT INTO `motor` VALUES (32, NULL, 9, 24, 63, 64, 2945, 1);
INSERT INTO `motor` VALUES (33, NULL, 10, 8, 65, 66, 1210, 1);
INSERT INTO `motor` VALUES (34, NULL, 10, 16, 65, 66, 2195, 1);
INSERT INTO `motor` VALUES (35, NULL, 10, 24, 65, 66, 4210, 1);
INSERT INTO `motor` VALUES (36, NULL, 11, NULL, NULL, NULL, 250, 1);
INSERT INTO `motor` VALUES (37, NULL, 12, NULL, NULL, NULL, 390, 1);
INSERT INTO `motor` VALUES (38, NULL, 13, NULL, NULL, NULL, 530, 1);
INSERT INTO `motor` VALUES (39, NULL, 14, NULL, NULL, NULL, 325, 1);
INSERT INTO `motor` VALUES (40, NULL, 15, NULL, NULL, NULL, 425, 1);
INSERT INTO `motor` VALUES (41, NULL, 16, NULL, NULL, NULL, 605, 1);

-- ----------------------------
-- Table structure for promociones
-- ----------------------------
DROP TABLE IF EXISTS `promociones`;
CREATE TABLE `promociones`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_promocion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `porcentaje` int(11) NULL DEFAULT NULL,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of promociones
-- ----------------------------
INSERT INTO `promociones` VALUES (1, 'NP', 50, 1);
INSERT INTO `promociones` VALUES (2, 'PCI Bienestar', 75, 1);
INSERT INTO `promociones` VALUES (3, 'PCI Competencia', 50, 1);

-- ----------------------------
-- Table structure for servicio_promos
-- ----------------------------
DROP TABLE IF EXISTS `servicio_promos`;
CREATE TABLE `servicio_promos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(11) NULL DEFAULT NULL,
  `id_promo` int(11) NULL DEFAULT NULL,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of servicio_promos
-- ----------------------------
INSERT INTO `servicio_promos` VALUES (1, 1, 1, 1);
INSERT INTO `servicio_promos` VALUES (2, 2, 1, 1);
INSERT INTO `servicio_promos` VALUES (3, 3, 2, 1);
INSERT INTO `servicio_promos` VALUES (4, 3, 3, 1);

-- ----------------------------
-- Table structure for servicios
-- ----------------------------
DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nro_servicio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nombre_servicio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `horas_servicio` int(1) NULL DEFAULT 1,
  `activo` int(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicios
-- ----------------------------
INSERT INTO `servicios` VALUES (1, '01', 'Sanatorio', 1, 1);
INSERT INTO `servicios` VALUES (2, '02', 'Convalecencia', 1, 1);
INSERT INTO `servicios` VALUES (3, '46', 'PCI', 1, 1);
INSERT INTO `servicios` VALUES (4, '37', 'AJUPECS', 1, 1);
INSERT INTO `servicios` VALUES (5, '37', 'SAJUPEN', 1, 1);
INSERT INTO `servicios` VALUES (6, NULL, 'Promo Estaciones', 1, 1);
INSERT INTO `servicios` VALUES (7, '06 / 08', 'Reintegro Opcional', 0, 1);
INSERT INTO `servicios` VALUES (8, '07', 'Reintegro Conjunto', 0, 1);
INSERT INTO `servicios` VALUES (9, NULL, 'Grupo Familiar x5', 1, 1);
INSERT INTO `servicios` VALUES (10, NULL, 'Grupo Familiar x6', 1, 1);
INSERT INTO `servicios` VALUES (11, NULL, 'Funcionario', 0, 1);
INSERT INTO `servicios` VALUES (12, '56', 'Inspira Plus', 0, 1);
INSERT INTO `servicios` VALUES (13, NULL, 'Adeon', 0, 1);
INSERT INTO `servicios` VALUES (14, '59', 'Prevencion 2', 0, 1);
INSERT INTO `servicios` VALUES (15, '106', 'Amparo Optativo', 0, 1);
INSERT INTO `servicios` VALUES (16, '09 / 110', 'SATS', 0, 1);

-- ----------------------------
-- View structure for v_ciudades
-- ----------------------------
DROP VIEW IF EXISTS `v_ciudades`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_ciudades` AS select `c`.`id` AS `c_id`,`c`.`nombre` AS `ciudad`,`c`.`id_departamento` AS `id_departamento`,`c`.`id_filial` AS `id_filial`,`d`.`id` AS `d_id`,`d`.`nombre` AS `departamento`,`d`.`id_pais` AS `d_id_pais`,`p`.`id` AS `p_id`,`p`.`pais` AS `pais`,`f`.`id` AS `f_id`,`f`.`nro_filial` AS `nro_filial`,`f`.`nombre_filial` AS `nombre_filial`,`f`.`mostrar` AS `mostrar`,`f`.`id_pais` AS `f_id_pais` from (((`ciudades` `c` join `departamentos` `d` on((`c`.`id_departamento` = `d`.`id`))) join `paises` `p` on((`d`.`id_pais` = `p`.`id`))) join `filiales` `f` on(((`c`.`id_filial` = `f`.`id`) and (`p`.`id` = `f`.`id_pais`))));

-- ----------------------------
-- View structure for v_franjas_filiales
-- ----------------------------
DROP VIEW IF EXISTS `v_franjas_filiales`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_franjas_filiales` AS select `ff`.`id` AS `ff_id`,`ff`.`id_filial` AS `id_filial`,`ff`.`id_franja_etaria` AS `id_franja_etaria`,`f`.`id` AS `f_id`,`f`.`nro_filial` AS `nro_filial`,`f`.`nombre_filial` AS `nombre_filial`,`f`.`mostrar` AS `mostrar`,`f`.`id_pais` AS `id_pais`,`p`.`id` AS `p_id`,`p`.`pais` AS `pais`,`fe`.`id` AS `fe_id`,`fe`.`desde` AS `desde`,`fe`.`hasta` AS `hasta`,`fe`.`descripcion` AS `descripcion` from (((`franjas_filiales` `ff` join `filiales` `f` on((`ff`.`id_filial` = `f`.`id`))) join `paises` `p` on((`f`.`id_pais` = `p`.`id`))) join `franjas_etarias` `fe` on((`ff`.`id_franja_etaria` = `fe`.`id`)));

-- ----------------------------
-- View structure for v_promociones
-- ----------------------------
DROP VIEW IF EXISTS `v_promociones`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_promociones` AS select `p`.`id` AS `p_id`,`p`.`id_filial` AS `p_filial`,`p`.`id_servicio` AS `id_servicio`,`p`.`id_franja_etaria` AS `p_franja_etaria`,`p`.`id_franja_filial` AS `id_franja_filial`,`p`.`porcentaje` AS `porcentaje`,`p`.`activo` AS `activo`,`f`.`id` AS `f_id`,`f`.`nro_filial` AS `nro_filial`,`f`.`nombre_filial` AS `nombre_filial`,`f`.`mostrar` AS `f_mostrar`,`f`.`id_pais` AS `id_pais`,`s`.`id` AS `s_id`,`s`.`nro_servicio` AS `nro_servicio`,`s`.`nombre_servicio` AS `nombre_servicio`,`s`.`mostrar` AS `s_mostrar`,`s`.`precio_base` AS `precio_base`,`ff`.`id` AS `ff_id`,`ff`.`id_filial` AS `ff_filial`,`ff`.`id_franja_etaria` AS `ff_franja_etaria`,`pa`.`id` AS `pa_id`,`pa`.`pais` AS `pais` from (((((`promociones` `p` join `filiales` `f` on((`p`.`id_filial` = `f`.`id`))) join `servicios` `s` on((`p`.`id_servicio` = `s`.`id`))) join `franjas_filiales` `ff` on(((`ff`.`id_filial` = `f`.`id`) and (`p`.`id_franja_filial` = `ff`.`id`)))) join `franjas_etarias` `fe` on(((`p`.`id_franja_etaria` = `fe`.`id`) and (`ff`.`id_franja_etaria` = `fe`.`id`)))) join `paises` `pa` on((`pa`.`id` = `f`.`id_pais`)));

-- ----------------------------
-- View structure for v_vista_general
-- ----------------------------
DROP VIEW IF EXISTS `v_vista_general`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `v_vista_general` AS select `tf`.`id` AS `tf_id`,`tf`.`id_franja_filial` AS `id_franja_filial`,`tf`.`id_servicio` AS `id_servicio`,`tf`.`precio` AS `precio`,`ff`.`id` AS `ff_id`,`ff`.`id_filial` AS `id_filial`,`ff`.`id_franja_etaria` AS `id_franja_etaria`,`f`.`id` AS `f_id`,`f`.`nro_filial` AS `nro_filial`,`f`.`nombre_filial` AS `nombre_filial`,`f`.`mostrar` AS `f_mostrar`,`f`.`id_pais` AS `id_pais`,`p`.`id` AS `p_id`,`p`.`pais` AS `pais`,`fe`.`id` AS `fe_id`,`fe`.`desde` AS `desde`,`fe`.`hasta` AS `hasta`,`fe`.`descripcion` AS `descripcion`,`s`.`id` AS `s_id`,`s`.`nro_servicio` AS `nro_servicio`,`s`.`nombre_servicio` AS `nombre_servicio`,`s`.`mostrar` AS `s_mostrar`,`s`.`precio_base` AS `precio_base` from (((((`tabla_final` `tf` left join `franjas_filiales` `ff` on((`ff`.`id` = `tf`.`id_franja_filial`))) left join `filiales` `f` on((`f`.`id` = `ff`.`id_filial`))) left join `paises` `p` on((`p`.`id` = `f`.`id_pais`))) left join `franjas_etarias` `fe` on((`fe`.`id` = `ff`.`id_franja_etaria`))) join `servicios` `s` on((`s`.`id` = `tf`.`id_servicio`)));

SET FOREIGN_KEY_CHECKS = 1;
