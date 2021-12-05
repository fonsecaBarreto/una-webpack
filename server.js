const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
app.use("/", express.static(path.resolve(__dirname, "dist")));


app.get(`login/:path*?`, (req, res) => {
   return res.sendFile(path.resolve(__dirname, "dist", "views", `login.html`)); //Estatica
});

/* Raiz */
app.get(`/:path*?`, (req, res) => {
    return res.sendFile(path.resolve(__dirname, "dist", "views", `unacompras.html`));
});

/* Inicar */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});


    /*  se Não existiver tentando fazer um autentificação é redirecionado para a home */
/*     const isUser = req.headers.authorization
    if(!isUser) return res.sendFile(path.resolve(__dirname, "dist", "views", `home.html`)); */ //Estatica
    // Existe está autenticado ?
    // ---> Aplicativo