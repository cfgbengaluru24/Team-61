const express = require("express");
const cors = require("cors");
const adminrouter = require("./src/routes/admin");
const mentorrouter = require("./src/routes/mentor");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/mentor", mentorrouter);
app.use("/admin", adminrouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
