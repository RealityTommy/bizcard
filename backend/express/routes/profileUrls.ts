import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Create a new links link for a user's profile
router.post("/:profileId", async (req, res) => {
  // Get the profile id from the request parameters
  const { profileId } = req.params;
  // Get the profile id, url, and name from the request body
  const { url, name } = req.body;
  // Create a new profile url in the database
  const profileUrl = await prisma.profileUrl.create({
    data: {
      profileId,
      url,
      name,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: profileUrl,
    message: "Successfully created profile url",
  });
});

// Update a url for a user's profile
router.put("/:profileId", async (req, res) => {
  // Get the links id from the request parameters
  const { profileId } = req.params;
  // Get the url and name from the request body
  const { url, name } = req.body;
  // Update the profile url in the database for the given id and url
  const profileUrl = await prisma.profileUrl.update({
    where: {
      id: {
        profileId,
        url,
      },
    },
    data: {
      url,
      name,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: profileUrl,
    message: "Successfully updated profile url",
  });
});

// Delete a profile url for a user's profile
router.delete("/:profileId", async (req, res) => {
  // Get the links id from the request parameters
  const { profileId } = req.params;
  // Get the url from the request body
  const { url } = req.body;
  // Delete the links link from the database for the given id
  const profileUrl = await prisma.profileUrl.delete({
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
    payload: profileUrl,
    message: "Successfully deleted profile url",
  });
});

// Export the router
export { router };
