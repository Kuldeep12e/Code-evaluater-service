import express from "express"
import serverConfig from "./config/serverConfig";
import bullBoardAdapter from "./config/bullboardConfig";
import v1Router from "./routes";
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/ui', bullBoardAdapter.getRouter());
app.use('/api/v1' , v1Router);

app.listen(serverConfig.PORT, () =>{
    console.log("Server started at 3000");
});

