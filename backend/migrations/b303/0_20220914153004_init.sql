-- upgrade --
CREATE TABLE IF NOT EXISTS `aerich` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `version` VARCHAR(255) NOT NULL,
    `app` VARCHAR(100) NOT NULL,
    `content` JSON NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(30) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `img_url` VARCHAR(200)   COMMENT '프로필 사진 url',
    `about_me` VARCHAR(300)   COMMENT '자기소개 글',
    `is_active` BOOL NOT NULL  DEFAULT 1,
    `is_admin` BOOL NOT NULL  DEFAULT 0
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `ingredient` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `tag` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `recipe` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `img_url` VARCHAR(200)   COMMENT '썸네일 이미지',
    `views` INT NOT NULL  DEFAULT 0,
    `user_id` INT NOT NULL COMMENT '레시피 작성자',
    CONSTRAINT `fk_recipe_user_253db62e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `article` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `category` INT NOT NULL  COMMENT '글 분류, 0 = .., 1 = .., 2 = ..' DEFAULT 0,
    `img_url` VARCHAR(200)   COMMENT '썸네일 이미지',
    `views` INT NOT NULL  DEFAULT 0,
    `recipe_id` INT,
    `user_id` INT NOT NULL COMMENT '글 작성자',
    CONSTRAINT `fk_article_user_a9a2ddac` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `articlecomment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `root` INT NOT NULL  DEFAULT 0,
    `group` INT NOT NULL  DEFAULT 0,
    `sequence` INT NOT NULL  DEFAULT 0,
    `article_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_articlec_article_ff1fa09f` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_articlec_user_1dde74c3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `cooking` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `category` INT NOT NULL  COMMENT '글 분류, 0 = .., 1 = .., 2 = ..' DEFAULT 0,
    `img_url` VARCHAR(200) NOT NULL  COMMENT '썸네일 이미지',
    `views` INT NOT NULL  DEFAULT 0,
    `recipe_id` INT,
    `user_id` INT NOT NULL COMMENT '갤러리 작성자',
    CONSTRAINT `fk_cooking_user_a9640521` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `cookingcomment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `root` INT NOT NULL  DEFAULT 0,
    `group` INT NOT NULL  DEFAULT 0,
    `sequence` INT NOT NULL  DEFAULT 0,
    `cooking_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_cookingc_cooking_d334ff3d` FOREIGN KEY (`cooking_id`) REFERENCES `cooking` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_cookingc_user_2f74968d` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `likearticle` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `article_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_likearti_article_08af6dec` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_likearti_user_aa59121e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `likecooking` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `cooking_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_likecook_cooking_7f16a9f4` FOREIGN KEY (`cooking_id`) REFERENCES `cooking` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_likecook_user_dccdfcc0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `notice` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `content` VARCHAR(10000) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `category` INT NOT NULL  COMMENT '글 분류, 0 = .., 1 = .., 2 = ..' DEFAULT 0,
    `img_url` VARCHAR(200)   COMMENT '썸네일 이미지',
    `views` INT NOT NULL  DEFAULT 0,
    `recipe_id` INT,
    `user_id` INT NOT NULL COMMENT '공지 작성자',
    CONSTRAINT `fk_notice_user_04538f9c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `likerecipe` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `recipe_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_likereci_recipe_e4178452` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_likereci_user_2374ccdd` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `recipecomment` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `root` INT NOT NULL  DEFAULT 0,
    `group` INT NOT NULL  DEFAULT 0,
    `sequence` INT NOT NULL  DEFAULT 0,
    `recipe_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_recipeco_recipe_e442e2ab` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_recipeco_user_b2b857ce` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `recipeingredient` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `amount` VARCHAR(20),
    `ingredient_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    CONSTRAINT `fk_recipein_ingredie_ba3e53ed` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_recipein_recipe_f922593f` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `follow` (
    `user_rel_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_rel_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `recipetag` (
    `recipe_id` INT NOT NULL,
    `tag_id` INT NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COMMENT='레시피 관련 태그';
