# <p align = "center"> Repo Provas API </p>

<p align="center">
   <img src="https://cdn-icons-png.flaticon.com/512/4727/4727488.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-FILIPE_CORREIA-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/f7lipe/projeto19-drivenpass?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This is a simple interface that allows you to enter tests from different subjects and teachers..

***

## :computer:	 Technologies and concepts 

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- ORM 
- SQL

***

## :rocket: Routes
### 🏠 Authentication 
```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@loremipsum.com",
        "password": "loremipsum"
}
```
    
```yml 
POST /signin
    - Route to sign in 
    - headers: {}
    - body: {
    "email": "lorem@loremipsum.com",
    "password": "loremipsum"
    }
```
### 📄 Test  
```yml 
POST /test (authenticated)
    - Route to insert a test
    - headers: { "Authorization": "Bearer ${token}" }
    - body: {
      "name": "My amazing test",
      "pdfUrl": "https://tests.didi",
      "teacherId": 1,
      "categoryId": 1,
      "disciplineId": 1
    }
```
```yml 
GET /tests?groupby=teacher (authenticated)
    - Get all tests sorted by teachers
    - headers: { "Authorization": "Bearer ${token}" }
    - body: {}
```   
```yml 
GET /tests?groupby=discipline (authenticated)
    - Get all tests sorted by disciplines
    - headers: { "Authorization": "Bearer ${token}" }
    - body: {}
```    
***

## 🏁 Running the aplication 


⤵️ Clone this repository on your machine:

```
git clone https://github.com/f7lipe/projeto20-repoprovas
```

⚙️ Create a .env file in the root of your project folder and configute it to look something like this
```yml
   PORT = 5000
   DATABASE_URL = postgres://postgres:password6@database_url/database_name
   MODE = DEV
   JWT_SECRET = "secret"
   CRYPT_KEY = "secret"
``` 


💻 Inside the folder, run the following command to install the dependencies.

```
npm install
```

🗃️ Build the database

```
npx prisma db push
npx prisma migrate dev
```

🏁 Finished the process, just start the server
```
npm run dev
```

⚠️ If you want to excecute unit tests you may run the comand  *npm test* instead


### 🔥 Hot tip 
If you are using Thunder Client, import the thunder_client_template.json to your Thunder Client extension and enjoy the benefits of all routes already configured.
