CREATE DATABASE ueh_monopoly;

USE ueh_monopoly;

CREATE TABLE `users` (
    `user_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `student_id` VARCHAR(20) NOT NULL,
    `play_remaining` TINYINT DEFAULT 3,
    `highest_score` INT DEFAULT 0,
    `time_play` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `question` (
    `question_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `category` ENUM('tin_tuyen_dung','hop_dong_trang','kien_thuc_nhanh','bay_lua_dao','may_man') NOT NULL,
    `question` TEXT NOT NULL,
    `option_a` VARCHAR(255),
    `option_b` VARCHAR(255),
    `option_c` VARCHAR(255),
    `option_d` VARCHAR(255),
    `correct_answer` CHAR(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;