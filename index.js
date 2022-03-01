
const express = require("express");
var cors = require("cors");
const path = require("path");
const { request } = require("http");
const app = express();
app.use('/', express.static(__dirname +'/src'));
app.use('/public', express.static(__dirname +'/public'));
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];

//przekazywania danych na stronę sewera
app.get("/", (req, res) => {
  request(
    { url: 'https://dream-team-andrzej.herokuapp.com/' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
  res.send(req.body);
    }
  )
});

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
  res.status(200).end;
});
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/api/loginUserDatabase", (req, res) => {
  loginUserDatabase.push(req.body);
  res.status(200).end;
});
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry",(req, res) => {
  request(
    { url: 'https://dream-team-andrzej.herokuapp.com/api/regestry/' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json({ regestryUsers });
    }
  )
  
});
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase", (req, res) => {
  res.json({ loginUserDatabase });
});
//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 5000;
//nasłuchiwanie app na jakim porcie na działać
app.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
