# GraphQL Users API

Ovaj projekat predstavlja jednostavan GraphQL API za upravljanje korisnicima, razvijen pomoću Apollo Server-a, Node.js-a i SQLite baze podataka.

## Uputstvo za pokretanje projekta

### 1. Kloniranje projekta

```bash
git clone https://github.com/davidstakic/2c-solution-home-task.git
cd 2c-solution-home-task
```

### 2. Instalacija zavisnosti

```bash
npm install
```

### 3. Pokretanje servera

```bash
node index.js
```

Nakon pokretanja, server je dostupan na: http://localhost:4000/

Na istoj adresi je dostupan i Apollo Server Playground koji omogućava testiranje GraphQL API-ja kroz izvršavanje upita i mutacija.

## Primeri upita i mutacija za testiranje

### Dodavanje novog korisnika

```graphql
mutation {
  addUser(name: "David", email: "david@gmail.com") {
    id
    name
    email
  }
}
```

### Dobavljanje svih korisnika

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Filtriranje korisnika po imenu i email adresi

```graphql
query {
  users(name: "David") {
    id
    name
    email
  }
}
```

```graphql
query {
  users(email: "david@gmail.com") {
    id
    name
    email
  }
}
```

```graphql
query {
  users(name: "David", email: "david@gmail.com") {
    id
    name
    email
  }
}
```

### Brisanje postojećeg korisnika

```graphql
mutation {
  deleteUser(id: 1)
}
```
## Tehnologije korišćene u projektu
- Node.js
- Apollo Server
- GraphQL
- SQLite3

## Funkcionalnosti
- Dodavanje novog korisnika
- Validacija email adrese pri dodavanju novog korisnika
- Dobavljanje liste svih korisnika
- Filtriranje korisnika po imenu i email adresi
- Brisanje postojećeg korisnika

## Video demonstracija
https://youtu.be/ddzXwEIuUcM
