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

};
