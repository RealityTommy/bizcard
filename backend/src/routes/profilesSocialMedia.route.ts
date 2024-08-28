import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Use JSON middleware
router.use(express.json());

// Create a new social media link for a user's profile
router.post("/:profileId", async (req, res) => {
  // Get the profile id from the request parameters
  const { profileId } = req.params;
  // Get the profile id, platform, and link from the request body
  const { url, platform } = req.body;
  // Create a new social media link in the database
  const socialMedia = await prisma.socialMediaLink.create({
    data: {
      profileId,
      url,
      platform,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: socialMedia,
    message: "Successfully created social media link",
  });
});

// Update a social media link for a user's profile
router.put("/:profileId", async (req, res) => {
  // Get the social media id from the request parameters
  const { profileId } = req.params;
  // Get the url and platform from the request body
  const { url, platform } = req.body;
  // Update the social media link in the database for the given id and url
  const socialMedia = await prisma.socialMediaLink.update({
    where: {
      id: {
        profileId,
        url,
      },
    },
    data: {
      url,
      platform,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: socialMedia,
    message: "Successfully updated social media link",
  });
});

// Delete a social media link for a user's profile
router.delete("/:profileId", async (req, res) => {
  // Get the social media id from the request parameters
  const { profileId } = req.params;
  // Get the url from the request body
  const { url } = req.body;
  // Delete the social media link from the database for the given id
  const socialMedia = await prisma.socialMediaLink.delete({
    where: {
      id: {
        profileId,
        url,
      },
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: socialMedia,
    message: "Successfully deleted social media link",
  });
});

// Delete all social media links for a user's profile
router.delete("/:profileId/all", async (req, res) => {
  // Get the profile id from the request parameters
  const { profileId } = req.params;
  // Delete all social media links for the profile
  await prisma.socialMediaLink.deleteMany({
    where: {
      profileId: profileId,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    message: "Successfully deleted all social media links",
  });
});

// Export the router
export { router };
