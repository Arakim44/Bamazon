CREATE DATABASE Bamazon;
USE Bamazon;


CREATE TABLE products(
        item_id INT AUTO_INCREMENT,
        product_name VARCHAR(250) NOT NULL,
        department_name VARCHAR(250) NOT NULL,
        price DECIMAL(6,2) NOT NULL,
        stock_quantity INT(6) NOT NULL,
        PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Entryway Storage Rack / Bench Seat','furniture',88.00,130),
	   ('Alen BreatheSmart FIT50 Customizable Air Purifier with HEPA-Pure for Allergies and Dust(Espresso, 1-pack)','Heating, Cooling & Air Quality',538.99,6),
       ('Long Sleeve Stretchy Top Solid Color Fashion T Shirt','Clothing', 15.99,350),
       ('GrowABeard-Beard Brush and Comb Set for Men - Friendly Cotton Bag - Best Bamboo Beard Kit for Home and Travel - Great for Dry or Wet Beards - Adds Shine and Softness to Your Healthy and Cool Beard.','Beauty & Personal Care',12.99,150),
       ('Native Remedies Candidate for Candida Balance and Maintenance, 59 ml','Vitamins & Dietary Supplements',22.37,450),
       ('Skull Outdoor Face Mask By IndieRidge - Microfiber Polyester Multifunctional Seamless Headwear Ski Motorcycle Snowboard Cycling Hiking','Motorcycle & Powersports',11.95,355),
       ('Kokuho Rose Rice, 15-Pound','Grocery & Gourmet Food',25.47,1200),
       ('Betrayal At House On The Hill - 2nd Edition','Toys & Games',33.99,58),
       ('MONEY Master the Game: 7 Simple Steps to Financial Freedom','Books',15.73,3400),
       ('General German Shepherd','Toys & Games',24.95,1);
       
       
       
SELECT * FROM products;
       
       
       
       


