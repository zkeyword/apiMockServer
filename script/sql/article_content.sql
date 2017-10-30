
CREATE TABLE  IF NOT EXISTS  `article_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `create_time` varchar(20) DEFAULT NULL,
  `update_time` varchar(20) DEFAULT NULL,
  `user_uid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`id`),
  UNIQUE KEY (`user_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8