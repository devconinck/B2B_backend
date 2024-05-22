const config = require('config');

const { initializeLogger } = require('../src/core/logging');
const { initializeData, getPrisma } = require('../src/data');
const products = require('./common/products');

module.exports = async () => {
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });

  await initializeData();

  const prisma = getPrisma();

  await prisma.company.createMany({
    data: [
      {
        ID: 1,
        BANKACCOUNTNR: 9876543210,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "company_logo_1.png",
        NAME: "Fake Company Inc. 1",
        SECTOR: "Technology",
        VATNUMBER: "US123456789",
        CITY: "New York",
        COUNTRY: "United States",
        NUMBER: "123",
        STREET: "Broadway",
        ZIPCODE: "10001",
        EMAIL: "email1@example.com",
        PHONENUMBER: "123456789",
      },
      {
        ID: 2,
        BANKACCOUNTNR: 1234567890,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "company_logo_2.png",
        NAME: "Fake Company Inc. 2",
        SECTOR: "Finance",
        VATNUMBER: "CT987654321",
        CITY: "City2",
        COUNTRY: "Country2",
        NUMBER: "2",
        STREET: "Street2",
        ZIPCODE: "23456",
        EMAIL: "email2@example.com",
        PHONENUMBER: "987654321",
      },
      {
        ID: 3,
        BANKACCOUNTNR: 1357924680,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo3.png",
        NAME: "Tech Solutions Ltd.",
        SECTOR: "Technology",
        VATNUMBER: "CA345678901",
        CITY: "Toronto",
        COUNTRY: "Canada",
        NUMBER: "789",
        STREET: "King St W",
        ZIPCODE: "M5V 2L7",
        EMAIL: "email3@example.com",
        PHONENUMBER: "345678901",
      },
      {
        ID: 4,
        BANKACCOUNTNR: 2468013579,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo4.png",
        NAME: "Financial Services Inc.",
        SECTOR: "Finance",
        VATNUMBER: "UK234567890",
        CITY: "London",
        COUNTRY: "United Kingdom",
        NUMBER: "456",
        STREET: "Trafalgar Square",
        ZIPCODE: "WC2N 5DU",
        EMAIL: "email4@example.com",
        PHONENUMBER: "234567890",
      },
      {
        ID: 5,
        BANKACCOUNTNR: 3692581470,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo5.png",
        NAME: "Software Solutions GmbH",
        SECTOR: "Technology",
        VATNUMBER: "DE456789012",
        CITY: "Berlin",
        COUNTRY: "Germany",
        NUMBER: "789",
        STREET: "Unter den Linden",
        ZIPCODE: "10178",
        EMAIL: "email5@example.com",
        PHONENUMBER: "456789012",
      },
      {
        ID: 6,
        BANKACCOUNTNR: 9876543210,
        CUSTOMERSTART: new Date("2024-05-20"),
        ISACTIVE: true,
        LOGO: "logo6.png",
        NAME: "Fashion Trends SAS",
        SECTOR: "Retail",
        VATNUMBER: "FR567890129",
        CITY: "Paris",
        COUNTRY: "France",
        NUMBER: "123",
        STREET: "Avenue des Champs-Élysées",
        ZIPCODE: "75001",
        EMAIL: "email6@example.com",
        PHONENUMBER: "567890123",
      },
    ]
  });

  await prisma.account.createMany({
    data: [
      {
        ID: 1,
        EMAIL: "admin@email.com",
        PASSWORD: "49cb8ecfabae3973ddedd7b4428763527e6a92f43a5f457238ceebe817d180fb",
        ROLE: 0,
        company_id: 3,
      },
      {
        ID: 3,
        EMAIL: "Charles.leclerc@icloud.com",
        PASSWORD: "8a5ce185d0fcc67c9d1dd322f759359bfaea65f0e395779eafc897aefbf410df",
        ROLE: 1,
        company_id: 1,
      },
      {
        ID: 4,
        EMAIL: "max.verstappen@hotmail.com",
        PASSWORD: "e3688b51224f68e5efb4cf8e3be8e9d89001cc240ccc27c1c76e3bffac5208fc",
        ROLE: 2,
        company_id: 1,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        ID: 1,
        DESCRIPTION: "Master your routine with GymBound Gymnastics Shoes, featuring grippy sole, flexible upper, and lightweight design for gymnastics practice and competitions.",
        NAME: "GymBound Gymnastics Shoes",
        PRICE: 3690,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "1.5.1",
        PRODUCTID: "PANASONIC_123",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 2,
        DESCRIPTION: "Cut the cord and enjoy freedom with EchoBeat True Wireless Headphones, featuring auto-pairing, touch controls, and portable charging case.",
        NAME: "EchoBeat True Wireless Headphones",
        PRICE: 135,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "",
        PRODUCTID: "MACHINE_BANDWISSEL2",
        PRODUCTUNITOFMEASUREID: "",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 3,
        DESCRIPTION: "Memory foam mattress",
        NAME: "Mattress",
        PRICE: 2271,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000011",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 4,
        DESCRIPTION: "Improve balance and stability with the BalanceBoard Stability Disc, featuring textured surface and air-filled design for dynamic workouts.",
        NAME: "BalanceBoard Stability Disc",
        PRICE: 614,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.1.4",
        PRODUCTID: "RC00002",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 5,
        DESCRIPTION: "Stay ahead of the curve with the Mi 12, featuring cutting-edge technology, innovative features, and Xiaomi's signature design.",
        NAME: "Mi 12",
        PRICE: 1140,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "4.5.2",
        PRODUCTID: "P100702",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 6,
        DESCRIPTION: "Grill with side burner",
        NAME: "Grill",
        PRICE: 2226,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000090",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 1
      },
      {
        ID: 7,
        DESCRIPTION: "Climb with confidence in RockClimber Climbing Shoes, featuring sticky rubber outsole, supportive fit, and durable construction.",
        NAME: "RockClimber Climbing Shoes",
        PRICE: 4731,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "4.3.3",
        PRODUCTID: "DP4K-36BLP_CINEMAKIT",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 8,
        DESCRIPTION: "Achieve mindfulness with the ZenZone Meditation App Subscription, offering guided meditation sessions, relaxation techniques, and stress-relief exercises for mental wellness.",
        NAME: "ZenZone Meditation App Subscription",
        PRICE: 4801,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.5.3",
        PRODUCTID: "WGN_0004",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 9,
        DESCRIPTION: "Nightstand with charging station",
        NAME: "Nightstand",
        PRICE: 206,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "102010",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 10,
        DESCRIPTION: "Carry your gym essentials in style with the GymPro Gym Bag, featuring multiple compartments, durable construction, and adjustable shoulder strap for comfort.",
        NAME: "GymPro Gym Bag",
        PRICE: 1379,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.2.2",
        PRODUCTID: "SPS-FUEL",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 11,
        DESCRIPTION: "A compact and portable charger for keeping electronic devices powered up during outdoor adventures, featuring solar panels, USB ports, and a rugged design for durability in harsh conditions.",
        NAME: "Explorer Pro Portable Charger",
        PRICE: 1883,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "3.3.1",
        PRODUCTID: "VWMINIS",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 12,
        DESCRIPTION: "Capture the perfect shot every time with the PixelPerfect P11 smartphone, equipped with advanced camera technology, AI-powered features, and unlimited cloud storage for your memories.",
        NAME: "PixelPerfect P11",
        PRICE: 4864,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "3.1.1",
        PRODUCTID: "BEMATRIX_RENTAL_FEE_14D",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 2
      },
      {
        ID: 13,
        DESCRIPTION: "Patio chair with cushion",
        NAME: "Patio Chair",
        PRICE: 1761,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000040",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 14,
        DESCRIPTION: "Step up your cardio routine with the CardioCruise Exercise Stepper, featuring adjustable resistance levels and non-slip surface for safe and effective workouts.",
        NAME: "CardioCruise Exercise Stepper",
        PRICE: 2435,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.1.4",
        PRODUCTID: "RB",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 15,
        DESCRIPTION: "Elevate your workspace with our executive desk set, crafted from premium materials for a sleek and professional look. Designed with functionality in mind, this set includes a spacious desk, ergonomic chair, and storage options.",
        NAME: "Executive Desk Set",
        PRICE: 552,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000113",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 16,
        DESCRIPTION: "Grind and polish concrete surfaces with the GrindPro Concrete Grinder, featuring powerful motor, adjustable speed, and ergonomic design.",
        NAME: "GrindPro Concrete Grinder",
        PRICE: 4377,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "4.2.1",
        PRODUCTID: "GAT102",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 17,
        DESCRIPTION: "Conquer the trails with TrailBlaze Hiking Boots, featuring rugged construction, waterproof design, and grippy outsole for hiking and backpacking adventures.",
        NAME: "TrailBlaze Hiking Boots",
        PRICE: 1659,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "2.2.3",
        PRODUCTID: "P300001",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 18,
        DESCRIPTION: "Drive piles quickly and efficiently with the PileDriver Piling Rig, featuring high impact force, precise controls, and stable operation.",
        NAME: "PileDriver Piling Rig",
        PRICE: 3289,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.2",
        PRODUCTID: "FSR_EXP_FP",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 3
      },
      {
        ID: 19,
        DESCRIPTION: "Elevate your game with JumpStart Basketball Sneakers, featuring ankle support, responsive cushioning, and durable outsole for quick cuts and jumps on the court.",
        NAME: "JumpStart Basketball Sneakers",
        PRICE: 4695,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "2.8.2",
        PRODUCTID: "P300004",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 20,
        DESCRIPTION: "Bed frame with storage",
        NAME: "Bed Frame",
        PRICE: 2353,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000012",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 21,
        DESCRIPTION: "Go the distance with Striderunner Marathon Shoes, featuring responsive cushioning, breathable upper, and durable outsole for long-distance running races.",
        NAME: "Striderunner Marathon Shoes",
        PRICE: 1338,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "2.3.2",
        PRODUCTID: "PAND1",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 22,
        DESCRIPTION: "Score goals with KickStart Soccer Cleats, featuring lightweight design, textured upper, and stud configuration for traction on the pitch.",
        NAME: "KickStart Soccer Cleats",
        PRICE: 4991,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.4.1",
        PRODUCTID: "PAND2",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 23,
        DESCRIPTION: "Improve your cardiovascular health with CardioBurn Treadmill, featuring adjustable speed, incline settings, and cushioned deck",
        NAME: "CardioBurn Treadmill",
        PRICE: 1014,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.2.1",
        PRODUCTID: "BK-FRAME-CARBON",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 24,
        DESCRIPTION: "Monitor your property with the WatchTower Smart Surveillance Camera, featuring 4K video, motion tracking, and night vision.",
        NAME: "WatchTower Smart Surveillance Camera",
        PRICE: 857,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.5.3",
        PRODUCTID: "INZAMELING",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 4
      },
      {
        ID: 25,
        DESCRIPTION: "Protect your devices with the SurgeGuard Smart Surge Protector, featuring surge protection, USB charging ports, and energy monitoring.",
        NAME: "SurgeGuard Smart Surge Protector",
        PRICE: 4490,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "2.2.4",
        PRODUCTID: "JS_0000002",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 5
      },
      {
        ID: 26,
        DESCRIPTION: "A lightweight and durable tent designed for backpacking adventures, with a compact pack size, easy setup, and weatherproof construction for reliable shelter on the trail.",
        NAME: "Alpine Backpacking Tent",
        PRICE: 3126,
        PRODUCTAVAILABILITY: "ORDER",
        PRODUCTCATEGORYID: "1.7.3",
        PRODUCTID: "VERWERKING",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 5
      },
      {
        ID: 27,
        DESCRIPTION: "Track your progress with the WeightWatch Digital Scale, offering accurate weight measurements, sleek design, and easy-to-read display for monitoring your fitness goals.",
        NAME: "WeightWatch Digital Scale",
        PRICE: 3530,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.5.3",
        PRODUCTID: "SN0002",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 5
      },
      {
        ID: 28,
        DESCRIPTION: "Buffet table with hutch",
        NAME: "Buffet Table",
        PRICE: 764,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "4408",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 5
      },
      {
        ID: 29,
        DESCRIPTION: "Shoe rack with cover",
        NAME: "Shoe Rack",
        PRICE: 4607,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000104",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 5
      },
      {
        ID: 30,
        DESCRIPTION: "Filing cabinet with lock",
        NAME: "Filing Cabinet",
        PRICE: 3945,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "987415",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 31,
        DESCRIPTION: "Bathroom cabinet with towel bar",
        NAME: "Bathroom Cabinet",
        PRICE: 1868,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.3",
        PRODUCTID: "20000107",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 32,
        DESCRIPTION: "Get the latest innovation with the iPhone 14 Pro, featuring advanced camera technology, powerful A-series chip, and sleek design.",
        NAME: "iPhone 14 Pro",
        PRICE: 2891,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.3.4",
        PRODUCTID: "P100436",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 33,
        DESCRIPTION: "Maximize your performance with the MultiFit Multi-Sport Watch, featuring activity tracking, workout modes, and performance metrics for multiple sports.",
        NAME: "MultiFit Multi-Sport Watch",
        PRICE: 4479,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "3.6.4",
        PRODUCTID: "P100302",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 34,
        DESCRIPTION: "Tackle tough jobs with the RoughRider Skid Steer Loader, featuring nimble maneuverability, powerful hydraulics, and versatile attachments.",
        NAME: "RoughRider Skid Steer Loader",
        PRICE: 4507,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.6.4",
        PRODUCTID: "EXH_001_BROWN",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 35,
        DESCRIPTION: "Maintain comfort and save energy with the ClimateControl Smart Thermostat, featuring scheduling, remote control, and energy tracking.",
        NAME: "ClimateControl Smart Thermostat",
        PRICE: 4385,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "1.5.3",
        PRODUCTID: "IND-CO377205",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
      {
        ID: 36,
        DESCRIPTION: "Tune into your favorite tunes with TuneFlex Wireless Earbuds, featuring dynamic sound, secure fit, and sweat-resistant design for active lifestyles.",
        NAME: "TuneFlex Wireless Earbuds",
        PRICE: 3820,
        PRODUCTAVAILABILITY: "STOCK",
        PRODUCTCATEGORYID: "2.2.1",
        PRODUCTID: "LEIDINGWERK_HEFBRUG",
        PRODUCTUNITOFMEASUREID: "EA",
        SYNCID: 1810,
        FROMCOMPANY_ID: 6
      },
    ],
  });

  await prisma.company_paymentoptions.createMany({
    data: [
      {
        Company_ID: 1,
        PAYMENTOPTIONS: "CREDIT_CARD"
      },
      {
        Company_ID: 1,
        PAYMENTOPTIONS: "PAYPAL"
      },
      {
        Company_ID: 2,
        PAYMENTOPTIONS: "BANK_TRANSFER"
      },
      {
        Company_ID: 2,
        PAYMENTOPTIONS: "BITCOIN"
      },
    ]
  })

  await prisma.order_table.createMany({
    data: [
      {ID:1, CURRENCY:"EUR", DATE:"2024-05-07", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Finance Solutions Ltd.", NETAMOUNT:1282500.0, ORDERDATETIME:"2024-05-07T00:00:00Z", ORDERID:"42021", ORDERREFERENCE:"", ORDERSTATUS:0, PAYMENTSTATUS:0, TAXAMOUNT:269300.0, TOTALAMOUNT:1551800.0, FROMCOMPANY_ID:1, TOCOMPANY_ID:6},
    {ID:2, CURRENCY:"EUR", DATE:"2024-05-29", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Energy Solutions Pty Ltd.", NETAMOUNT:1824100000.0, ORDERDATETIME:"2024-05-29T00:00:00Z", ORDERID:"43818", ORDERREFERENCE:"", ORDERSTATUS:0, PAYMENTSTATUS:0, TAXAMOUNT:328338000.0, TOTALAMOUNT:2188920000.0, FROMCOMPANY_ID:1, TOCOMPANY_ID:5},
    {ID:3, CURRENCY:"EUR", DATE:"2024-05-21", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Tech Solutions AB", NETAMOUNT:154467300.0, ORDERDATETIME:"2024-05-21T00:00:00Z", ORDERID:"46331", ORDERREFERENCE:"TEST RUN 1/21/2020 5:04:41 PM", ORDERSTATUS:4, PAYMENTSTATUS:2, TAXAMOUNT:30893500.0, TOTALAMOUNT:185360800.0, FROMCOMPANY_ID:2, TOCOMPANY_ID:4},
    {ID:4, CURRENCY:"EUR", DATE:"2024-06-01", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Transport Innovations GmbH", NETAMOUNT:1600000.0, ORDERDATETIME:"2024-06-01T00:00:00Z", ORDERID:"42060", ORDERREFERENCE:"", ORDERSTATUS:1, PAYMENTSTATUS:2, TAXAMOUNT:320000.0, TOTALAMOUNT:1920000.0, FROMCOMPANY_ID:2, TOCOMPANY_ID:3},
    {ID:5, CURRENCY:"EUR", DATE:"2024-05-16", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Media Innovations SAS", NETAMOUNT:9992700.0, ORDERDATETIME:"2024-05-16T00:00:00Z", ORDERID:"47827", ORDERREFERENCE:"ADELA", ORDERSTATUS:5, PAYMENTSTATUS:0, TAXAMOUNT:1998500.0, TOTALAMOUNT:11991200.0, FROMCOMPANY_ID:3, TOCOMPANY_ID:2},
    {ID:6, CURRENCY:"EUR", DATE:"2024-05-08", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Engineering Innovations BVBA", NETAMOUNT:500000.0, ORDERDATETIME:"2024-05-08T00:00:00Z", ORDERID:"43068", ORDERREFERENCE:"", ORDERSTATUS:0, PAYMENTSTATUS:1, TAXAMOUNT:116000.0, TOTALAMOUNT:696000.0, FROMCOMPANY_ID:3, TOCOMPANY_ID:1},
    {ID:7, CURRENCY:"EUR", DATE:"2024-05-09", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Energy Solutions Pty Ltd.", NETAMOUNT:15000000000.0, ORDERDATETIME:"2024-05-09T00:00:00Z", ORDERID:"47401", ORDERREFERENCE:"NVISO", ORDERSTATUS:4, PAYMENTSTATUS:0, TAXAMOUNT:3000000000.0, TOTALAMOUNT:18000000000.0, FROMCOMPANY_ID:4, TOCOMPANY_ID:6},
    {ID:8, CURRENCY:"EUR", DATE:"2024-05-23", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Food Innovations Ltd.", NETAMOUNT:6010800.0, ORDERDATETIME:"2024-05-23T00:00:00Z", ORDERID:"49223", ORDERREFERENCE:"REF", ORDERSTATUS:1, PAYMENTSTATUS:0, TAXAMOUNT:1202200.0, TOTALAMOUNT:7213000.0, FROMCOMPANY_ID:4, TOCOMPANY_ID:5},
    {ID:9, CURRENCY:"USD", DATE:"2024-05-31", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Retail Innovations Pty Ltd.", NETAMOUNT:3500000.0, ORDERDATETIME:"2024-05-31T00:00:00Z", ORDERID:"93534", ORDERREFERENCE:"QUOTE FOR PLANT DLW", ORDERSTATUS:1, PAYMENTSTATUS:1, TAXAMOUNT:0.0, TOTALAMOUNT:3500000.0, FROMCOMPANY_ID:5, TOCOMPANY_ID:4},
    {ID:10, CURRENCY:"EUR", DATE:"2024-05-21", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Tech Innovations GmbH", NETAMOUNT:6010800.0, ORDERDATETIME:"2024-05-21T00:00:00Z", ORDERID:"48667", ORDERREFERENCE:"ETHICS", ORDERSTATUS:5, PAYMENTSTATUS:2, TAXAMOUNT:1202200.0, TOTALAMOUNT:7213000.0, FROMCOMPANY_ID:5, TOCOMPANY_ID:3},
    {ID:11, CURRENCY:"EUR", DATE:"2024-06-02", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Fashion Innovations Pty Ltd.", NETAMOUNT:8000000.0, ORDERDATETIME:"2024-06-02T00:00:00Z", ORDERID:"248787", ORDERREFERENCE:"", ORDERSTATUS:3, PAYMENTSTATUS:0, TAXAMOUNT:0.0, TOTALAMOUNT:8000000.0, FROMCOMPANY_ID:6, TOCOMPANY_ID:2},
    {ID:12, CURRENCY:"EUR", DATE:"2024-06-02", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Fake Company Inc. 2", NETAMOUNT:150000000.0, ORDERDATETIME:"2024-06-02T00:00:00Z", ORDERID:"41995", ORDERREFERENCE:"", ORDERSTATUS:2, PAYMENTSTATUS:0, TAXAMOUNT:31500000.0, TOTALAMOUNT:181500000.0, FROMCOMPANY_ID:6, TOCOMPANY_ID:1},
    {ID:13, CURRENCY:"EUR", DATE:"2024-05-30", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Tech Innovations S.L.", NETAMOUNT:0.0, ORDERDATETIME:"2024-05-30T00:00:00Z", ORDERID:"52364", ORDERREFERENCE:"HIERnMEnDIEnSPECIALEnCHARACTERS", ORDERSTATUS:5, PAYMENTSTATUS:0, TAXAMOUNT:0.0, TOTALAMOUNT:0.0, FROMCOMPANY_ID:1, TOCOMPANY_ID:6},
    {ID:14, CURRENCY:"EUR", DATE:"2024-05-25", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Fake Company Inc. 2", NETAMOUNT:9992700.0, ORDERDATETIME:"2024-05-25T00:00:00Z", ORDERID:"47736", ORDERREFERENCE:"ACHERNAR'S", ORDERSTATUS:4, PAYMENTSTATUS:2, TAXAMOUNT:1998500.0, TOTALAMOUNT:11991200.0, FROMCOMPANY_ID:1, TOCOMPANY_ID:5},
    {ID:15, CURRENCY:"EUR", DATE:"2024-05-23", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Finance Solutions Ltd.", NETAMOUNT:9992700.0, ORDERDATETIME:"2024-05-23T00:00:00Z", ORDERID:"47748", ORDERREFERENCE:"ACONCAGUA'S", ORDERSTATUS:0, PAYMENTSTATUS:2, TAXAMOUNT:1998500.0, TOTALAMOUNT:11991200.0, FROMCOMPANY_ID:2, TOCOMPANY_ID:4},
    {ID:16, CURRENCY:"EUR", DATE:"2024-05-25", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Retail Innovations GmbH", NETAMOUNT:6010800.0, ORDERDATETIME:"2024-05-25T00:00:00Z", ORDERID:"48704", ORDERREFERENCE:"FIREWALL", ORDERSTATUS:3, PAYMENTSTATUS:1, TAXAMOUNT:1202200.0, TOTALAMOUNT:7213000.0, FROMCOMPANY_ID:2, TOCOMPANY_ID:3},
    {ID:17, CURRENCY:"EUR", DATE:"2024-05-27", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Engineering Innovations GmbH", NETAMOUNT:72064900.0, ORDERDATETIME:"2024-05-27T00:00:00Z", ORDERID:"45391", ORDERREFERENCE:"TEST RUN 07/01/2020 21:06:41", ORDERSTATUS:4, PAYMENTSTATUS:2, TAXAMOUNT:14609600.0, TOTALAMOUNT:87657500.0, FROMCOMPANY_ID:3, TOCOMPANY_ID:2},
    {ID:18, CURRENCY:"EUR", DATE:"2024-05-08", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Media Innovations KK", NETAMOUNT:6010800.0, ORDERDATETIME:"2024-05-08T00:00:00Z", ORDERID:"48720", ORDERREFERENCE:"FOOTER", ORDERSTATUS:0, PAYMENTSTATUS:2, TAXAMOUNT:1202200.0, TOTALAMOUNT:7213000.0, FROMCOMPANY_ID:3, TOCOMPANY_ID:1},
    {ID:19, CURRENCY:"EUR", DATE:"2024-05-29", LASTPAYMENTREMINDER:"2024-05-20 20:08:57", NAME:"Retail Solutions Ltd.", NETAMOUNT:475000.0, ORDERDATETIME:"2024-05-29T00:00:00Z", ORDERID:"40360", ORDERREFERENCE:"", ORDERSTATUS:1, PAYMENTSTATUS:1, TAXAMOUNT:95000.0, TOTALAMOUNT:570000.0, FROMCOMPANY_ID:4, TOCOMPANY_ID:6},
    {ID:20, CURRENCY:"EUR", DATE:"2024-05-18", LASTPAYMENTREMINDER:"2024-05-20 20:08:56", NAME:"Engineering Solutions Co. Ltd.", NETAMOUNT:500000.0, ORDERDATETIME:"2024-05-18T00:00:00Z", ORDERID:"91142", ORDERREFERENCE:"12/10/2019 - REORDERISSUE", ORDERSTATUS:5, PAYMENTSTATUS:0, TAXAMOUNT:0.0, TOTALAMOUNT:500000.0, FROMCOMPANY_ID:4, TOCOMPANY_ID:5}
  ]
  });

  await prisma.orderitem.createMany({
    data: [{ID:1, INSTOCK:"ORDER", NAME:"SPS-F", ORDERID:42021, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:150000000.0, UNITOFMEASUREID:"EA", UNITPRICE:15000000.0, FROMORDER_ID:1, PRODUCT_ID:1},
    {ID:2, INSTOCK:"ORDER", NAME:"P100407", ORDERID:42021, ORDERITEMID:10, QUANTITY:50, SYNCID:1757, TOTAL:118750.0, UNITOFMEASUREID:"EA", UNITPRICE:2375.0, FROMORDER_ID:2, PRODUCT_ID:2},
    {ID:3, INSTOCK:"STOCK", NAME:"P120104", ORDERID:42021, ORDERITEMID:10, QUANTITY:10, SYNCID:1757, TOTAL:15000.0, UNITOFMEASUREID:"EA", UNITPRICE:1500.0, FROMORDER_ID:3, PRODUCT_ID:3},
    {ID:4, INSTOCK:"ORDER", NAME:"SPS-F", ORDERID:43818, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:150000000.0, UNITOFMEASUREID:"EA", UNITPRICE:15000000.0, FROMORDER_ID:4, PRODUCT_ID:4},
    {ID:5, INSTOCK:"STOCK", NAME:"JS_TEST_ATP", ORDERID:43818, ORDERITEMID:10, QUANTITY:1000, SYNCID:1757, TOTAL:1131900.0, UNITOFMEASUREID:"EA", UNITPRICE:1132.0, FROMORDER_ID:5, PRODUCT_ID:5},
    {ID:6, INSTOCK:"STOCK", NAME:"171_71_25_19_34", ORDERID:43818, ORDERITEMID:20, QUANTITY:500, SYNCID:1757, TOTAL:47500.0, UNITOFMEASUREID:"EA", UNITPRICE:95.0, FROMORDER_ID:6, PRODUCT_ID:6},
    {ID:7, INSTOCK:"STOCK", NAME:"P120102", ORDERID:46331, ORDERITEMID:1, QUANTITY:40, SYNCID:1757, TOTAL:60108.0, UNITOFMEASUREID:"EA", UNITPRICE:1503.0, FROMORDER_ID:1, PRODUCT_ID:7},
    {ID:8, INSTOCK:"STOCK", NAME:"GAT102_ROL", ORDERID:46331, ORDERITEMID:10, QUANTITY:20, SYNCID:1757, TOTAL:6000.0, UNITOFMEASUREID:"EA", UNITPRICE:300.0, FROMORDER_ID:2, PRODUCT_ID:8},
    {ID:9, INSTOCK:"STOCK", NAME:"P100411", ORDERID:46331, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:99927.0, UNITOFMEASUREID:"EA", UNITPRICE:9993.0, FROMORDER_ID:3, PRODUCT_ID:9},
    {ID:10, INSTOCK:"STOCK", NAME:"P120102", ORDERID:42060, ORDERITEMID:1, QUANTITY:40, SYNCID:1757, TOTAL:60108.0, UNITOFMEASUREID:"EA", UNITPRICE:1503.0, FROMORDER_ID:4, PRODUCT_ID:10},
    {ID:11, INSTOCK:"STOCK", NAME:"P100403", ORDERID:42060, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:112027.0, UNITOFMEASUREID:"EA", UNITPRICE:11203.0, FROMORDER_ID:5, PRODUCT_ID:11},
    {ID:12, INSTOCK:"ORDER", NAME:"P110405", ORDERID:42060, ORDERITEMID:6, QUANTITY:10, SYNCID:1757, TOTAL:10170.0, UNITOFMEASUREID:"EA", UNITPRICE:1017.0, FROMORDER_ID:6, PRODUCT_ID:12},
    {ID:13, INSTOCK:"STOCK", NAME:"5.00E+12", ORDERID:47827, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:1006.0, UNITOFMEASUREID:"EA", UNITPRICE:101.0, FROMORDER_ID:1, PRODUCT_ID:13},
    {ID:14, INSTOCK:"ORDER", NAME:"P100001", ORDERID:47827, ORDERITEMID:10, QUANTITY:100, SYNCID:1757, TOTAL:150226.0, UNITOFMEASUREID:"EA", UNITPRICE:1502.0, FROMORDER_ID:2, PRODUCT_ID:14},
    {ID:15, INSTOCK:"STOCK", NAME:"BINOCULARS_01", ORDERID:47827, ORDERITEMID:10, QUANTITY:100, SYNCID:1757, TOTAL:38000.0, UNITOFMEASUREID:"EA", UNITPRICE:380.0, FROMORDER_ID:3, PRODUCT_ID:15},
    {ID:16, INSTOCK:"STOCK", NAME:"P100411", ORDERID:43068, ORDERITEMID:1, QUANTITY:10, SYNCID:1757, TOTAL:99927.0, UNITOFMEASUREID:"EA", UNITPRICE:9993.0, FROMORDER_ID:4, PRODUCT_ID:16},
    {ID:17, INSTOCK:"ORDER", NAME:"GAT102_JS", ORDERID:43068, ORDERITEMID:10, QUANTITY:20, SYNCID:1757, TOTAL:24000.0, UNITOFMEASUREID:"XBX", UNITPRICE:100.0, FROMORDER_ID:5, PRODUCT_ID:17},
    {ID:18, INSTOCK:"STOCK", NAME:"20000113", ORDERID:43068, ORDERITEMID:10, QUANTITY:10, SYNCID:1757, TOTAL:100000.0, UNITOFMEASUREID:"MON", UNITPRICE:10000.0, FROMORDER_ID:6, PRODUCT_ID:18},
    {ID:19, INSTOCK:"STOCK", NAME:"20000010", ORDERID:47401, ORDERITEMID:10, QUANTITY:10, SYNCID:1757, TOTAL:1334000.0, UNITOFMEASUREID:"EA", UNITPRICE:133400.0, FROMORDER_ID:1, PRODUCT_ID:19},
    {ID:20, INSTOCK:"STOCK", NAME:"P120102", ORDERID:47401, ORDERITEMID:1, QUANTITY:40, SYNCID:1757, TOTAL:60108.0, UNITOFMEASUREID:"EA", UNITPRICE:1503.0, FROMORDER_ID:2, PRODUCT_ID:20}]
  });

};
