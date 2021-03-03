CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `login_name` varchar(20) NOT NULL DEFAULT '' COMMENT '登录名',
  `login_pwd` varchar(32) NOT NULL DEFAULT '' COMMENT '登录密码',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户真实姓名名',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态.0: 正常,1:冻结,2：删除',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(20) DEFAULT NULL COMMENT '最后登录ip',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `email` varchar(50) DEFAULT NULL COMMENT '邮件地址',
  `tel` varchar(12) DEFAULT NULL COMMENT '手机号码',
  `role_id` int(11) DEFAULT '0' COMMENT '所属角色id',
  `bindingRole` int(11) DEFAULT NULL COMMENT '绑定角色（暂用于绑定老师 绑定分校）',
  `uuid` varchar(20) DEFAULT NULL COMMENT '随机字符串',
  `is_examine` int(2) DEFAULT NULL COMMENT '审核状态1:已审核 0:未审核',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='系统用户表';
