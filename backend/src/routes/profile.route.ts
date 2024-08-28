import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Use JSON middleware
router.use(express.json());

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

// Get profile social media
router.get("/:id/socialmedia", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Get all social media links for the profile
  const socialMedia = await prisma.socialMediaLink.findMany({
    where: {
      profileId: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: socialMedia,
    message: "Successfully retrieved social media",
  });
});

// Get profile urls
router.get("/:id/urls", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Get all urls for the profile
  const urls = await prisma.profileUrl.findMany({
    where: {
      profileId: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: urls,
    message: "Successfully retrieved urls",
  });
});

// Export the router
export { router };
