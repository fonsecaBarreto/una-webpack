import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useMiddlewares } from "./middlewares"
import { App as LandginPage } from '../src/react-apps/apps/landingpage/app'
import { App as Main } from '../src/react-apps/apps/main/app'
import { StaticRouter } from 'react-router-dom'
const PORT = process.env.PORT || 8080;
const server = express()
useMiddlewares(server);

const CLIENT_DIST_DIR =   path.resolve(__dirname, "..", "..", "dist")

server.use("/", express.static(CLIENT_DIST_DIR));

const manifest = fs.readFileSync(path.join(CLIENT_DIST_DIR, "manifest.json"), 'utf-8')
const assets = JSON.parse(manifest)

server.get('/bem-vindo/:path*?', (req, res) => {
/*   const component = ReactDOMServer.renderToString(React.createElement(LandginPage)) */
  const indexFile = path.join(CLIENT_DIST_DIR, "views", "landingpage.html")

  const component = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <LandginPage />
    </StaticRouter>
  );


  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Em manutenção, aguarde!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${component}</div>`)
    );
  });

})


server.get('/:path*?', (req, res) => {

  console.log("reveinveid here", req.url)
 /*  return res.sendFile(path.join(CLIENT_DIST_DIR, "views", "main.html"))  */
 const component = ReactDOMServer.renderToString(
  <StaticRouter location={req.url}>
    <Main />
  </StaticRouter>
);

  console.log(component)
  const indexFile = path.join(CLIENT_DIST_DIR, "views", "main.html")
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Alguma coisa deu errado:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(
      data
        .replace('//{{metadata}}//', `  window.__INITIAL_DATA__ =${JSON.stringify({ location:  "" })}`)
        .replace('<div id="root"></div>', `<div id="root">${component}</div>`)
    );
  }); 

})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})