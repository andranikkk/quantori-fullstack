const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3002",
  })
);
const prisma = new PrismaClient();
app.use(bodyParser.json());

const jwtSecret = "your_jwt_secret";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },

    async (jwtPayload, done) => {
      const user = await prisma.user.findUnique({
        where: { email: jwtPayload.email },
      });

      if (user) return done(null, user);
      return done(null, false);
    }
  )
);

app.use(passport.initialize());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email }, jwtSecret);
    return res.json({ accessToken: token });
  }

  return res.status(403).json({ message: "Invalid email or password" });
});

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "User already exists" });
  }
});

const handleAuthError = (err, req, res, next) => {
  if (err) {
    res.status(401).json({ message: "Unauthorized!" });
  } else {
    next();
  }
};

app.get(
  "/profile",
  handleAuthError,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ email: req.user.email, username: req.user.username });
  }
);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
