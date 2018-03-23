CREATE TABLE user
(
   UserId  integer not null auto_increment primary key, -- primary key column
   Name      VARCHAR(50)  NOT NULL,
   CreatedAt    TIMESTAMP default '0000-00-00 00:00:00',
   DeletedAt    TIMESTAMP,
   LastLogin timestamp default now() on update now(),
   hash VARCHAR(200) NOT NULL,
   salt VARCHAR(200) NOT NULL
);
CREATE TABLE results
(
  result_id integer not null auto_increment primary key,
  input VARCHAR(500) NOT NULL,
  output VARCHAR(500) NOT NULL
);

CREATE TABLE `history` (
    `userid` INT NOT NULL,
    `result_id` INT NOT NULL,
    PRIMARY KEY (`userid`, `result_id`),
    CONSTRAINT `Constr_history_user_fk`
        FOREIGN KEY `user_fk` (`userid`) REFERENCES `users` (`userid`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `Constr_history_result_fk`
        FOREIGN KEY `results_fk` (`result_id`) REFERENCES `results` (`result_id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);
