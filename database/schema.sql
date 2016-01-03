USE `monitoring`;

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
  `password` CHAR(128) NOT NULL ,
  `hash` CHAR(128) NOT NULL ,
  PRIMARY KEY (`id`),
  UNIQUE (`email`),
  UNIQUE (`hash`)
) ENGINE = InnoDB;

CREATE TABLE `node` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `hash` CHAR(128) NOT NULL ,
  `name` VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
  `user` INT NOT NULL ,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user) REFERENCES user(id),
  UNIQUE (`hash`)
) ENGINE = InnoDB;
