const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const ROOT = "/customer";
const { REACT_APPS }  = require("../apps_manifest")
app.use(cors());

const PORT = process.env.PORT || 8080;

/* Arquivos Estaticos */
app.use("/", express.static(path.resolve(__dirname, "..", "dist")));
/* Raiz */
app.get("/", (req, res)=>{  return res.redirect(ROOT) })
/* Views */
REACT_APPS.forEach((a) => {
    app.get(`/${a.name}/:path*?`, (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "dist", "views", `${a.name}.html`));
    });
}); 
/* Qualquer Outra Rota */
app.get(`/*`, (req, res) => { return res.redirect(ROOT) });
/* Inicar */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
