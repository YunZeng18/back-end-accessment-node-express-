require('dotenv').config();
const PORT = process.env.PORT || 5000;
const createServer = require("./server")

const app = createServer.createServer();

app.listen(PORT, console.log(`running at http://localhost:${PORT}`));


