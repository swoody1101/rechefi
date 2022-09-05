-- upgrade --
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(30) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `img_url` VARCHAR(200) NOT NULL,
    `about_me` VARCHAR(300) NOT NULL,
    `is_active` BOOL NOT NULL,
    `is_admin` BOOL NOT NULL
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `tag` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `recipe` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL  COMMENT '레시피 제목',
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `img_url` VARCHAR(200) NOT NULL  COMMENT '썸네일 이미지',
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_recipe_user_253db62e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `likerecipe` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `article_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_likereci_recipe_c6614ae6` FOREIGN KEY (`article_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_likereci_user_2374ccdd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `recipecomment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `root` INT NOT NULL,
    `group` INT NOT NULL,
    `sequence` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_recipeco_recipe_e442e2ab` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_recipeco_user_b2b857ce` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `recipeingredient` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `amount` INT NOT NULL,
    `ingredient_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    CONSTRAINT `fk_recipein_ingredie_ba3e53ed` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_recipein_recipe_f922593f` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `article` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `category` INT NOT NULL,
    `img_url` VARCHAR(200) NOT NULL,
    `cited_recipe_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_article_user_a9a2ddac` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `likearticle` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `article_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_likearti_article_08af6dec` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_likearti_user_aa59121e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;;
CREATE TABLE IF NOT EXISTS `articlecomment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `root` INT NOT NULL,
    `group` INT NOT NULL,
    `sequence` INT NOT NULL,
    `article_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_articlec_article_ff1fa09f` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_articlec_user_1dde74c3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;-- downgrade --
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `ingredient`;
DROP TABLE IF EXISTS `tag`;
DROP TABLE IF EXISTS `recipe`;
DROP TABLE IF EXISTS `likerecipe`;
DROP TABLE IF EXISTS `recipecomment`;
DROP TABLE IF EXISTS `recipeingredient`;
DROP TABLE IF EXISTS `article`;
DROP TABLE IF EXISTS `likearticle`;
DROP TABLE IF EXISTS `articlecomment`;

