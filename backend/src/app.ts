const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello codev");
});

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
