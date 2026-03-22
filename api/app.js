const express = require("express");
const app = express();
const port = 3333;
const cors = require("cors");
const prisma = require("./prismaClient");

app.use(cors());

app.use(express.json());

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON format." });
  }

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "The 'name' field is required." });
  }

  if (!email) {
    return res.status(400).json({ message: "The 'email' field is required." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: "The 'password' field is required." });
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email is already registered." });
    }

    return res.status(500).json({ message: "Error registering user." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
