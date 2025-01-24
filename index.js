const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT_APP || 3001;
dotenv.config();

// Configuração e conexão ao banco de dados
const db = require("./models");

//utilização dos cookies
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const staticDir = path.resolve(__dirname, "../BoticarioStore/public/Image");

app.use("/uploads", express.static(staticDir));

// Importa e utiliza o roteador
app.use("/", require("./routers"));

// Inicia o servidor na porta especificada
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


