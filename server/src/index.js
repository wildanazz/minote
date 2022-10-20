const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const errorRoutes = require("./routes/error");

require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

app.use(noteRoutes);
app.use(userRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
