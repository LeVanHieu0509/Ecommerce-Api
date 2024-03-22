-- 1.shopdev_user
IF OBJECT_ID('shopdev_user', 'U') IS NOT NULL
    DROP TABLE shopdev_user;
GO

CREATE TABLE shopdev_user (
 user_id INT IDENTITY(1,1) NOT NULL,
 user_name VARCHAR(255) NULL,
 user_email VARCHAR(255) NULL,
 PRIMARY KEY (user_id)
);
GO

-- run mock DATA
INSERT INTO shopdev_user VALUES( 'admin', 'admin@anonystick.com');
INSERT INTO shopdev_user VALUES( 'shop', 'shop@anonystick.com');
INSERT INTO shopdev_user VALUES( 'user', 'user@anonystick.com');
GO

-- 2.shopdev_role
IF OBJECT_ID('shopdev_role', 'U') IS NOT NULL
    DROP TABLE shopdev_role;
GO

CREATE TABLE shopdev_role (
 role_id INT NOT NULL,
 role_name VARCHAR(255) NULL,
 role_description VARCHAR(255) NULL,
 PRIMARY KEY (role_id)
);
GO

-- run mock DATA
INSERT INTO shopdev_role VALUES(1, 'admin', 'read,update,delete,create');
INSERT INTO shopdev_role VALUES(2, 'shop', 'read,update,create');
INSERT INTO shopdev_role VALUES(3, 'user', 'read');
GO

-- 3.shopdev_menu
-- menu A, B, C set for role ?
IF OBJECT_ID('shopdev_menu', 'U') IS NOT NULL
    DROP TABLE shopdev_menu;
GO

CREATE TABLE shopdev_menu (
 menu_id INT IDENTITY(10,1) NOT NULL,
 menu_name VARCHAR(255) NULL,
 menu_pid VARCHAR(255) NULL,
 menu_path VARCHAR(255) NULL,
 PRIMARY KEY (menu_id)
);
GO

-- run mock DATA
-- https://shopee.vn/%C4%90%E1%BB%93ng-H...
INSERT INTO shopdev_menu VALUES( 'Dong ho', '11035788', '/Đồng-Hồ-cat.11035788');
INSERT INTO shopdev_menu VALUES( 'may tinh', '11035954', '/Máy-Tính-Laptop-cat.11035954');
INSERT INTO shopdev_menu VALUES( 'thoi trang nam', '11035567', '/Thời-Trang-Nam-cat.11035567');
GO

-- 4.shopdev_role_menu
-- gan menu nao cho role nao? ex: Dong ho, may tinh, thoi trang nam cho admin, may tinh cho shop
IF OBJECT_ID('shopdev_role_menu', 'U') IS NOT NULL
    DROP TABLE shopdev_role_menu;
GO

CREATE TABLE shopdev_role_menu (
 role_id INT NOT NULL,
 menu_id INT NOT NULL,
 PRIMARY KEY (role_id, menu_id)
);
GO

-- run mock DATA
INSERT INTO shopdev_role_menu VALUES(1, 11);
INSERT INTO shopdev_role_menu VALUES(1, 12);
INSERT INTO shopdev_role_menu VALUES(1, 13);
INSERT INTO shopdev_role_menu VALUES(2, 12);
INSERT INTO shopdev_role_menu VALUES(2, 13);
INSERT INTO shopdev_role_menu VALUES(3, 13);
GO

-- shopdev_user_role
IF OBJECT_ID('shopdev_user_role', 'U') IS NOT NULL
    DROP TABLE shopdev_user_role;
GO

CREATE TABLE shopdev_user_role (
 user_id INT NOT NULL,
 role_id INT NOT NULL,
 PRIMARY KEY (user_id, role_id)
);
GO

-- run mock DATA
INSERT INTO shopdev_user_role VALUES(1, 1);
INSERT INTO shopdev_user_role VALUES(2, 2);
INSERT INTO shopdev_user_role VALUES(3, 3);
GO

-- 1. Get quyen truy cap menu chi user = 1
-- 1.1 Xen thu user = 1 co quyen truy cap gi?
SELECT role_id FROM shopdev_user_role WHERE user_id = 1; -- role_id = 1
-- 1.2 XEm role co nhung quyen truy cap menu nao?
SELECT menu_id FROM shopdev_role_menu WHERE role_id = 1; -- menu_id = 11,12,13
-- 1.3 Xem nhung menu nao
SELECT * FROM shopdev_menu WHERE menu_id IN (11,12,13);

-- mot cau 
SELECT * FROM shopdev_menu WHERE menu_id IN (SELECT menu_id FROM shopdev_role_menu WHERE role_id IN (SELECT role_id FROM shopdev_user_role WHERE user_id = 1));

-- cach 2
SELECT * FROM shopdev_menu mn
JOIN (SELECT rome.menu_id FROM shopdev_user_role usro
JOIN shopdev_role_menu rome ON usro.role_id = rome.role_id
WHERE usro.user_id = 1) t ON mn.menu_id = t.menu_id