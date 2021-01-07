# \*\*\*\*\*\*\* REDO FÖR RÄTTNING \*\*\*\*\*\*\*


# 1 Funktionella Krav

## 1.1 Kund

1. Lista tillgängliga bilar
2. Beställa hyrbil
3. Avboka order
4. Se tidigare och aktiva bokningar

## 1.2 Admin
1. Lista kunder
2. Lägg till fordon
3. Ta bort / inaktivera fordon
4. Uppdatera fordon

## 1.3 Extra

1. (Admin) Aktivera fordon.
2. (Admin) Se ALLA fordon, inaktiv som aktiv.


# 2 Tekniska Krav

## 2.1 Kund
1. GET http://localhost:8081/api/v1/cars listar tillgängliga bilar
2. POST http://localhost:8081/api/v1/ordercar Beställ hyrbil
3. PUT http://localhost:8081/api/v1/updateorder Avboka order
4. GET http://localhost:8081/api/v1/myorders Se tidigare och aktiva bokningar

Står inget om GET då det är bara hämta URLen

### 2.1.1 POST http://localhost:8081/api/v1/ordercar konsumerar JSON
Skapa en order genom att skicka in en JSON enligt följande format:
```sh
{
    "created":"2020-10-05 15:17:00",
    "fromDate":"2020-10-06 08:00",
    "endDate":"2020-10-10 16:00",
    "active":true,
    "car":{
        "id":1
    },
    "customer":{
        "id":1
    }
}
```

### 2.1.2 PUT http://localhost:8081/api/v1/updateorder Avboka order
Avboka en order genom att skicka in en JSON enligt följande format:

```sh
{
    "id":2
}
```

"id" räcker men man kan även skicka in hela objekt.

## 2.2 Admin
1. GET http://localhost:8081/api/v1/customers Hämtar alla kunder
2. GET http://localhost:8081/api/v1/allcars Hämtar alla bilar
3. POST http://localhost:8081/api/v1/addcar Lägger till ett nytt fordon
4. DELETE http://localhost:8081/api/v1/deletecar Tar bort / inaktiverar fordon
5. PUT http://localhost:8081/api/v1/activatecar Aktiverar fordon
6. PUT http://localhost:8081/api/v1/updatecar Uppdaterar fordon

### 2.2.1 POST http://localhost:8081/api/v1/addcar Lägger till ett nytt fordon
Lägg till ett nytt fordon genom att skicka in en JSON enligt följande format:

```sh
{
    "name":"Audi",
    "model":"S4 - 1994",
    "price":999,
    "available":true,
    "active":true
}
```

### 2.2.2 DELETE http://localhost:8081/api/v1/deletecar Tar bort / inaktiverar fordon
Ta bort ett fordon genom att skicka in JSON enligt följande format:
```sh
{
    "id":1
}
```

Hela objekt kan skickas in, men "id" räcker.

### 2.2.3 PUT http://localhost:8081/api/v1/activatecar Aktiverar fordon
Aktiver ett fordon genom att skicka in JSON enligt följande format:
```sh
{
    "id":1
}
```

Hela objekt kan skickas in, men "id" räcker.

### 2.2.4 PUT http://localhost:8081/api/v1/updatecar Uppdaterar fordon
Uppdaterar ett fordon genom att skicka in JSON enligt följande format:
```sh
{
    "id":1,
    "name":"Audi",
    "model": "urquattro",
    "price":5000,
    "available":true,
    "active":true
}
```
"id" krävs, man behöver inte ha med alla variabler utan man kan ändra enstaka genom t.ex:
```sh
{
    "id":1,
    "model": "urquattro123"
}
```
Sätts inte available samt active så sätts dem till false även om dem har varit true innan.


# 3 Loggning

## 3.1 SLF4J
SLF4J.Logger används för enkel loggning.
Skriver ut som info() då något skapas, ändras eller tas bort.
Skriver ut till console samt filen spring.log.

# 4 Övervakning / Monitorering

## 4.1 Actuator
Monitorering kommer man åt genom http://localhost:9000/actuator.

Enbart tillgång till **/health** samt **/beans**.

# 5 Tekniska Krav

### 5.1 Felhantering

1. Enklare felhantering som slänger custom exceptions om id inte finns.
2. Loggning med SLF4J.

### 5.2 Struktur
Filstruktur enligt Controller/DAO/Entity/Service.

### 5.3 H2 databas
Data lagras i en H2 databas som sparas i minnet, ingen persistence utanför minnet.
H2-console kommer man åt på http://localhost:8081/api/v1/h2-console.
```sh
Saved Settings: Generic H2 (Embedded)
Setting Name: Generic H2 (Embedded)
Driver class: org.h2.Driver
JDBC URL: jdbc:h2:mem:carrental
Username: admin
Password: admin
```

# 6 Säkerhet

## 6.1 Spring Security

### 6.1.1 Användare
Det finns två användare lagrat i minnet:
```sh
Username: user
Password: user
Role(s): USER
------------------
Username: admin
Password: admin
Role(s): USER, ADMIN
```

### 6.1.2 Basic Authorization
**USER** kommer åt:
```sh
/cars**
/ordercar**
/updateorder**
/myorders**
```

**ADMIN** kommer åt:
```sh
/customers**
/addcar**
/deletecar**
/updatecar**
/activatecar**
/allcars**
/h2-console/**
```

