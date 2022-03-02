
const express = require("express");
var cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://dream-team-andrzej.herokuapp.com/, https://dream-team-andrzej.herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(cors({credentials: true}))
// app.use('/', express.static(__dirname +'/src'));
// app.use('/public', express.static(__dirname +'/public'));


app.use(express.json());
const regestryUsers = [];
const loginUserDatabase = [];
const connections = [];

//przekazywania danych na stronę sewera
app.get("/",cors(),(req, res) => {
  res.send(req.body);
});

io.on('regestryUsers',(socket) => {
  regestryUsers.push(socket);
  console.log('a user connected');
});
io.on('loginUserDatabase',(socket) => {
  loginUserDatabase.push(socket);
});

// pobieranie danych z rejestracji i zapisywanie ich do tablicy regystryUsers
app.post("/api/regestry",(req, res) => {
  regestryUsers.push(req.body);
  res.status(200).end;
});
// pobieranie danych z inputów dream teamu i dodawanie ich do pustej tablict "loginUserDatabase"
app.post("/api/loginUserDatabase",(req, res) => {
  loginUserDatabase.push(req.body);
  res.status(200).end;
});
// wysłanie danych z rejestracji zapisanych na serwerze z powrotem juz na strone logowania do sprawdzenia poprawnosci logowania usera
app.get("/api/regestry",cors(), (req, res) => {
  res.json({ regestryUsers });
});
//wysłanie danych do bazy danych zalogowanego uzytkownika
app.get("/api/loginUserDatabase", cors(),(req, res) => {
  res.json({ loginUserDatabase });
});
//tworzenie zmiennej która przekaże dane do heroku, dodatkowo należy dopisać w package.jeson w scripts : "web": "index.js"
const herokuPort = process.env.PORT || 80;
//nasłuchiwanie app na jakim porcie na działać
server.listen(herokuPort, () => {
  console.log(`Działam na porcie ${herokuPort}`);
});
