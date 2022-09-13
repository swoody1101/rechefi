-- upgrade --
ALTER TABLE `likerecipe` DROP FOREIGN KEY `fk_likereci_recipe_c6614ae6`;
ALTER TABLE `likerecipe` RENAME COLUMN `article_id` TO `recipe_id`;
ALTER TABLE `likerecipe` ADD CONSTRAINT `fk_likereci_recipe_e4178452` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE;
-- downgrade --
ALTER TABLE `likerecipe` DROP FOREIGN KEY `fk_likereci_recipe_e4178452`;
ALTER TABLE `likerecipe` RENAME COLUMN `recipe_id` TO `article_id`;
ALTER TABLE `likerecipe` ADD CONSTRAINT `fk_likereci_recipe_c6614ae6` FOREIGN KEY (`article_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE;
