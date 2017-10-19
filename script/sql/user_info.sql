CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `detail_info` json DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  `update_time` varchar(20) DEFAULT NULL,
  `gender` int(11) DEFAULT 0, -- user gender, 0:default, 1:male, 2:female, 3:delete
  `level` int(11) DEFAULT 1, -- user level, 0:super admin, 1:common admin, 2:common user
  `status` int(11) DEFAULT 1, -- user status, 0:super admin, 1:common, 2:forbidden, 3:delete
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`),
  UNIQUE KEY (`name`),
  UNIQUE KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO 
`user_info`
 (`id`,`uid`,`name`,`email`,`password`,`detail_info`,`create_time`,`update_time`,`level`,`status`) 
 VALUES (DEFAULT,'0ieucqm8ohpumuvl', 'admin01','01@admin.com','a5a263743859f3c67406849e72a52fb29b18f339','{}',0,0,0,0);

 INSERT INTO 
`user_info`
 (`id`,`uid`, `name`,`email`,`password`,`detail_info`,`create_time`,`update_time`,`level`,`status`) 
 VALUES (DEFAULT,'pn9i5fhunleim67a','admin02','02@admin.com','a5a263743859f3c67406849e72a52fb29b18f339','{}',1,1,1,1);

 INSERT INTO 
`user_info`
 (`id`,`uid`,`name`,`email`,`password`,`detail_info`,`create_time`,`update_time`,`level`,`status`) 
 VALUES (DEFAULT,'7lyi038zrxjv1kxq','admin03','03@admin.com','a5a263743859f3c67406849e72a52fb29b18f339','{}',1,1,1,1);

 INSERT INTO 
`user_info`
 (`id`,`uid`,`name`,`email`,`password`,`detail_info`,`create_time`,`update_time`,`level`,`status`) 
 VALUES (DEFAULT,'o6cpp1egcyit3qa5','user01','01@user.com','a5a263743859f3c67406849e72a52fb29b18f339','{}',1,1,2,1);

  INSERT INTO 
`user_info`
 (`id`,`uid`,`name`,`email`,`password`,`detail_info`,`create_time`,`update_time`,`level`,`status`) 
 VALUES (DEFAULT,'i6f90qo5s3tt7kta','user02','02@user.com','a5a263743859f3c67406849e72a52fb29b18f339','{}',1,1,2,1);

