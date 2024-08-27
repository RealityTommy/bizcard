import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Get all profiles
router.get("/", async (req, res) => {
  const profiles = await prisma.profile.findMany();
  res.json({
    success: true,
    payload: profiles,
    message: "Retrieved all profiles",
  });
});

// Create a new profile
router.post("/", async (req, res) => {
  const {
    slug,
    displayName,
    image,
    phone,
    phoneCall,
    phoneText,
    bio,
    location,
  } = req.body;
  const profile = await prisma.profile.create({
    data: {
      slug,
      displayName,
      image,
      phone,
      phoneCall,
      phoneText,
      bio,
      location,
    },
  });
  res.json({
    success: true,
    payload: profile,
    message: "Successfully created profile",
  });
});

// Get a profile by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const profile = await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
  res.json({
    success: true,
    payload: profile,
    message: "Successfully retrieved profile",
  });
});

// Update a profile by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    slug,
    displayName,
    image,
    phone,
    phoneCall,
    phoneText,
    bio,
    location,
  } = req.body;
  const profile = await prisma.profile.update({
    where: {
      id: id,
    },
    data: {
      slug,
      displayName,
      image,
      phone,
      phoneCall,
      phoneText,
      bio,
      location,
    },
  });
  res.json({
    success: true,
    payload: profile,
    message: "Successfully updated profile",
  });
});

// Delete a profile by id
router.delete("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Delete the profile from the database
  const profile = await prisma.profile.delete({
    where: {
      id: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: profile,
    message: "Successfully deleted profile",
  });
});

// Export the router
export { router };
