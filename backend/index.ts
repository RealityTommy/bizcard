import { PrismaClient } from "@prisma/client";
import express from "express";

// Import the routers for users, organizations, and profiles
import { router as userRouter } from "./src/routes/user.route";
import { router as organizationRouter } from "./src/routes/organization.route";
import { router as profileRouter } from "./src/routes/profile.route";
import { router as socialMediaRouter } from "./src/routes/profilesSocialMedia.route";
import { router as profileUrlRouter } from "./src/routes/profileUrl.route";

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
