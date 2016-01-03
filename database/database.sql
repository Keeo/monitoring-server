CREATE TABLE `monitoring`.`node` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `hash` CHAR(128) NOT NULL ,
  `name` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
  PRIMARY KEY (`id`), UNIQUE (`hash`)
) ENGINE = InnoDB;
