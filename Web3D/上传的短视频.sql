CREATE TABLE `edu_videosource` (
  `videoId` int(11) NOT NULL AUTO_INCREMENT COMMENT '视频id',
  `name` varchar(200) DEFAULT NULL COMMENT '视频名称',
  `videoSize` varchar(200) DEFAULT NULL COMMENT '视频原片大小',
  `addTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上传时间',
  `status` varchar(200) DEFAULT 'init' COMMENT '转码状态 (init：待转码 progress：转码中 finish：转码成功 error：转码失败 delete : 已回收)',
  `videoLength` varchar(11) DEFAULT '0' COMMENT '转码后大小',
  `idVarchar` varchar(200) DEFAULT NULL COMMENT '视频播放码',
  `videoDuration` int(11) DEFAULT '0' COMMENT '视频时长（s）',
  `imageUrl` varchar(255) DEFAULT NULL COMMENT '封面图片地址',
  `fileType` int(2) DEFAULT '1' COMMENT '播放文件类型 1：视频 2：音频',
  `initType` int(2) DEFAULT '1' COMMENT '源文件类型 1：视频 2：音频',
  `uploadUserId` int(11) DEFAULT '0' COMMENT '上传用户id',
  `videoType` varchar(20) DEFAULT NULL COMMENT '视频类型(ninetySixkoo96刻....)',
  PRIMARY KEY (`videoId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='录播视频表';
