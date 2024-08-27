import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  // Retrieve all users from the database
  const users = await prisma.user.findMany();
  res.json({
    success: true,
    payload: users,
    message: "Successfully retrieved all users",
  });
});

// Create a new user
router.post("/", async (req, res) => {
  // Get the email and name from the request body
  const { email, name } = req.body;
  // Create a new user in the database
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: user,
    message: "Successfully created user",
  });
});

// Get a user by id
router.get("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Retrieve the user from the database
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: user,
    message: "Successfully retrieved user",
  });
});

// Update a user by id
router.put("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Get the email and name from the request body
  const { email, name } = req.body;
  // Update the user in the database
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email,
      name,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: user,
    message: "Successfully updated user",
  });
});

// Delete a user by id, delete all its profiles, delete all its organization memberships
router.delete("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Delete all of the user's profiles
  await prisma.profile.deleteMany({
    where: {
      userId: id,
    },
  });
  res.json({
    success: true,
    message: "Successfully deleted all profiles",
  });

  // Delete all of the user's organization memberships
  await prisma.organizationMember.deleteMany({
    where: {
      userId: id,
    },
  });
  // Delete the user
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: user,
    message: "Successfully deleted user",
  });
});

// Get all profiles of a user
router.get("/:userId/profiles", async (req, res) => {
  // Get the userId from the request parameters
  const { userId } = req.params;
  // Retrieve all profiles of the user from the database
  const profiles = await prisma.profile.findMany({
    where: {
      userId: userId,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: profiles,
    message: "Successfully retrieved profiles",
  });
});

// Get all organization memberships of a user
router.get("/:userId/organizations", async (req, res) => {
  // Get the userId from the request parameters
  const { userId } = req.params;
  // Retrieve all organization memberships of the user from the database
  const memberships = await prisma.organizationMember.findMany({
    where: {
      userId: userId,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: memberships,
    message: "Successfully retrieved organization memberships",
  });
});

// Export the router
export { router };
