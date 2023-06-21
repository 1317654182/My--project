/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : aolai

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2023-05-30 22:46:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isDefault` varchar(255) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '张三', '18057242272', '黑龙江省', '哈尔滨市', '南岗区', '征仪花园c区', '0', '1');
INSERT INTO `address` VALUES ('2', '小张', '18057242272', '黑龙江省', '五常市', '牛家满族镇', '五屯村', '0', '1');
INSERT INTO `address` VALUES ('3', '李四', '18057242273', '北京市', '海淀区', '朝阳区', '金波花园', '0', '2');

-- ----------------------------
-- Table structure for goods_cart
-- ----------------------------
DROP TABLE IF EXISTS `goods_cart`;
CREATE TABLE `goods_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `pprice` varchar(255) DEFAULT NULL,
  `num` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_cart
-- ----------------------------
INSERT INTO `goods_cart` VALUES ('1', '1', '3', '小款绒毛大款2020年', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '785', '4');
INSERT INTO `goods_cart` VALUES ('2', '1', '4', '2022最新款', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '897', '4');
INSERT INTO `goods_cart` VALUES ('4', '2', '1', '大衣绒毛大款2020年必须买', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '897', '3');

-- ----------------------------
-- Table structure for goods_search
-- ----------------------------
DROP TABLE IF EXISTS `goods_search`;
CREATE TABLE `goods_search` (
  `id` int(10) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pprice` varchar(255) DEFAULT NULL,
  `oprice` varchar(255) DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_search
-- ----------------------------
INSERT INTO `goods_search` VALUES ('1', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '大衣绒毛大款2020年必须买', '39', '399', '8');
INSERT INTO `goods_search` VALUES ('2', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '大款大衣绒毛大款2020年必须买', '54', '543', '5');
INSERT INTO `goods_search` VALUES ('3', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '小款绒毛大款2020年', '65', '785', '8');
INSERT INTO `goods_search` VALUES ('4', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '2022最新款', '76', '897', '6');
INSERT INTO `goods_search` VALUES ('5', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '大款大衣绒毛大款2020年必须买123456789', '99', '599', '7');

-- ----------------------------
-- Table structure for store_order
-- ----------------------------
DROP TABLE IF EXISTS `store_order`;
CREATE TABLE `store_order` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `goods_name` varchar(255) DEFAULT NULL,
  `goods_price` varchar(255) DEFAULT NULL,
  `goods_num` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of store_order
-- ----------------------------
INSERT INTO `store_order` VALUES ('10', '1', '553152', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('11', '1', '467618', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('12', '1', '295000169361', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('13', '1', '692767', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('14', '1', '745502', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('15', '1', '373176', '2022最新款', '3588', '4', '1');
INSERT INTO `store_order` VALUES ('16', '1', '442043', '2022最新款', '3588', '4', '1');
INSERT INTO `store_order` VALUES ('17', '1', '148330', '小款绒毛大款2020年,2022最新款,大款大衣绒毛大款2020年必须买', '6782', '9', '1');
INSERT INTO `store_order` VALUES ('18', '1', '202305062134523222121', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');
INSERT INTO `store_order` VALUES ('19', '2', '202305062277441809846', '小款绒毛大款2020年,大衣绒毛大款2020年必须买', '5382', '6', '1');
INSERT INTO `store_order` VALUES ('20', '1', '202305141444709634459', '小款绒毛大款2020年,2022最新款', '6728', '8', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userPwd` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangsan', '1234567', '18057242272', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '张三', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgwNTcyNDIyNzIiLCJpYXQiOjE2NzAzOTY5OTJ9.-4DtpPWdEWS-BnF-97vZQj4gcbnSsk0CdnZ4eP0n7Wo', 'undefined', 'undefined');
INSERT INTO `user` VALUES ('2', 'lisi', '1234567', '18057242273', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '李四', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgwNTcyNDIyNzMiLCJpYXQiOjE2NzAzOTcwNDJ9.gTqAptWi85g20hUfESykA7XVXa1iLpU37PrXsSWBQls', 'undefined', 'undefined');
INSERT INTO `user` VALUES ('50', '', '123456789', '18057242274', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '默认昵称', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgwNTcyNDIyNzQiLCJpYXQiOjE2NzA0Nzc4Mjl9.gpmAxha9c1_t4MSgU-k4kgmhcnkhFylLGZT0-unvPe8', 'undefined', 'undefined');
INSERT INTO `user` VALUES ('51', '', '132123131', '18057242279', 'https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', '默认昵称', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgwNTcyNDIyNzkiLCJpYXQiOjE2ODMzODA5ODl9.RUmvGrTOjGuod5l7ib72t4MiNFrtBFseyU50-f6UshM', 'undefined', 'undefined');
