import { PrismaClient } from "@prisma/client";
import express from "express";

// Create a new prisma client
const prisma = new PrismaClient();

// Create a new express router
const router = express.Router();

// Get all organizations
router.get("/", async (req, res) => {
  const organizations = await prisma.organization.findMany();
  res.json({
    success: true,
    payload: organizations,
    message: "Successfully retrieved all organizations",
  });
});

// Create a new organization
router.post("/", async (req, res) => {
  const { name, slug } = req.body;
  const organization = await prisma.organization.create({
    data: {
      name,
      slug,
    },
  });
  res.json({
    success: true,
    payload: organization,
    message: "Successfully created organization",
  });
});

// Get a organization by id
router.get("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Retrieve the organization from the database
  const organization = await prisma.organization.findUnique({
    where: {
      id: id,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: organization,
    message: "Successfully retrieved organization",
  });
});

// Update a organization by id
router.put("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Get the name and slug from the request body
  const { name, slug } = req.body;
  // Update the organization in the database
  const organization = await prisma.organization.update({
    where: {
      id: id,
    },
    data: {
      name,
      slug,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: organization,
    message: "Successfully updated organization",
  });
});

// Delete a organization by id, delete all its members, delete its profiles
router.delete("/:id", async (req, res) => {
  // Get the id from the request parameters
  const { id } = req.params;
  // Delete all of the organization's members
  await prisma.organizationMember.deleteMany({
    where: {
      organizationId: id,
    },
  });
  res.json({
    success: true,
    message: "Successfully deleted all organization members",
  });
  // Delete all of the organization's profiles
  await prisma.profile.deleteMany({
    where: {
      organizationId: id,
    },
  });
  // Delete the organization
  const organization = await prisma.organization.delete({
    where: {
      id: id,
    },
  });
});

// get all members of an organization
router.get("/:organizationId/members", async (req, res) => {
  // Get the organizationId from the request parameters
  const { organizationId } = req.params;
  // Retrieve all members of the organization from the database
  const members = await prisma.organizationMember.findMany({
    where: {
      organizationId: organizationId,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: members,
    message: "Successfully retrieved members",
  });
});

// Get all profiles of an organization
router.get("/:organizationId/profiles", async (req, res) => {
  // Get the organizationId from the request parameters
  const { organizationId } = req.params;
  // Retrieve all profiles of the organization from the database
  const profiles = await prisma.profile.findMany({
    where: {
      organizationId: organizationId,
    },
  });
  // Send a response to the client
  res.json({
    success: true,
    payload: profiles,
    message: "Successfully retrieved profiles",
  });
});

// Export the router
export { router };
