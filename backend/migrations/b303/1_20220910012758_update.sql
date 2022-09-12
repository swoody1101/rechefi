-- upgrade --
ALTER TABLE `recipeingredient` MODIFY COLUMN `amount` VARCHAR(20);
-- downgrade --
ALTER TABLE `recipeingredient` MODIFY COLUMN `amount` INT;
