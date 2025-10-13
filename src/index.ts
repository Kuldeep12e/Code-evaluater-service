import express from "express"
import serverConfig from "./config/serverConfig";
import bullBoardAdapter from "./config/bullboardConfig";
import v1Router from "./routes";
import bodyParser from "body-parser"
import runPython from "./containers/runPythonDocker";
import runJava from "./containers/runJavaDocker";
import runCpp from "./containers/runC++Container";

const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/ui', bullBoardAdapter.getRouter());
app.use('/api/v1' , v1Router);

app.listen(3000, () => {
  console.log("Server started at 3000");
const cppCode = `
#include <iostream>
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << x * 3 << endl;
    return 0;
}
`;

runCpp(cppCode, "5");

});

