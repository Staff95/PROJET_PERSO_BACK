var express = require('express');
var app = express();
//Middleware pour récupéré la donnée
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

require('dotenv').config();

//Connexion à mongodb(Base de donnée) :
var mongoose = require('mongoose'); 
const url = process.env.DATABASE_URL;

mongoose.connect(url)
.then(console.log("Mongodb connected"))
.catch(err => console.log(err));

// Mettre à disposition les données et les rendres accessible pour le front
const cors = require('cors');
//de base
//app.use(cors());
// Transmettre TOUT type de données même sensible(JWT)
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//Method put et delete pour express
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//bcrypt : hashage de mot de passe
const bcrypt = require('bcrypt');

// Import JWT
const {createTokens, validateToken} = require('./JWT');

// import JWT-decode
const {jwtDecode} = require('jwt-decode')

// Cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//  MULTER : images 
const multer = require('multer');
app.use(express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/')
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname); // Use original file name
    },
});
const upload = multer({storage});