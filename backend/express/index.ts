import { PrismaClient } from "@prisma/client";
import express from "express";

// Import the routers for users, organizations, and profiles
import { router as userRouter } from "./routes/users";
import { router as organizationRouter } from "./routes/organizations";
import { router as profileRouter } from "./routes/profiles";
import { router as socialMediaRouter } from "./routes/profilesSocialMedia";
import { router as profileUrlRouter } from "./routes/profileUrls";

// Create a new prism client
const prisma = new PrismaClient();

// Create a new express app
const app = express();

// Use users, organizations, and profiles routers
app.use("/users", userRouter);
app.use("/organizations", organizationRouter);
app.use("/profiles", profileRouter);
app.use("/socialmedia", socialMediaRouter);
app.use("/urls", profileUrlRouter);

// Listen on port 3000
app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
