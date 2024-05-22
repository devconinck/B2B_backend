# 2024-backend-g02-24

## Deployment
Voor het deployen van de backend moet er een .env file aangemaakt worden met de volgende informatie:
```env
NODE_ENV=development
DATABASE_URL=mysql://username:password@localhost:3306/delawaredb
```

## Testen
Voor het runnen van de testen wordt er een andere databank gebruikt, namelijk delawaredb_test.
Het sql script voor deze db aan te maken is aanwezig in de root map.
