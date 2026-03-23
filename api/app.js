const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require("cors");
const prisma = require("./prismaClient");

app.use(cors());

app.use(express.json());

const requiredFields = ["name", "email", "password"];

function validateRequiredFields(body) {
  for (const field of requiredFields) {
    if (!body[field]) {
      return `The '${field}' field is required.`;
    }
  }

  return null;
}

function parseUserId(idParam) {
  const parsedId = Number(idParam);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/users/register", async (req, res) => {
  const validationError = validateRequiredFields(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      },
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email is already registered." });
    }

    return res.status(500).json({ message: "Error registering user." });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    return res
      .status(400)
      .json({ message: "The 'id' parameter must be a positive integer." });
  }

  const validationError = validateRequiredFields(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      },
    });

    return res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found." });
    }

    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email is already registered." });
    }

    return res.status(500).json({ message: "Error updating user." });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    return res
      .status(400)
      .json({ message: "The 'id' parameter must be a positive integer." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user." });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users." });
  }
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON format." });
  }

  return res.status(500).json({ message: "Unexpected server error." });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
