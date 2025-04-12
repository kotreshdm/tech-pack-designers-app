const express = require("express");
const app = express();
const port = 8080; // You can change the port number if needed

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
