const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Mandatory 1 API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const nav = fs.readFileSync("./public/components/navbar.html").toString();
const indexHTML = fs.readFileSync("./public/pages/index.html").toString();
const nodejs = fs.readFileSync("./public/pages/nodejs.html").toString();
const tech = fs.readFileSync("./public/pages/tech.html").toString();
const ssr = fs.readFileSync("./public/pages/ssr.html").toString();
const footer = fs.readFileSync("./public/components/footer.html").toString();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(nav + indexHTML + footer);
});

app.get("/nodejs", (req, res) => {
  res.send(nav + nodejs + footer);
});

app.get("/tech", (req, res) => {
  res.send(nav + tech + footer);
});

app.get("/ssr", (req, res) => {
  res.send(nav + ssr + footer);
});

//Reference: https://javascript.plainenglish.io/integrate-open-api-swagger-with-node-and-express-b5b77bdc081b
/**
 * @swagger
 * /test:
 *   get:
 *     description: Learning how to implement swagger documentation within NodeJS
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get("/test", (req, res) => {
  res.send({ message: "test passed" });
});

app.get("/api-docs", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server port running on ", PORT);
});
