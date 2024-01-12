import express from "express";
import bodyParser from "body-parser";

import isUserAuthenticated from "../middlewares/authMiddlewares.js";

import {
    getFeaturedResearches,
    createResearch,
    getResearch,
    updateResearch,
    deleteResearch,
    getResearchesByTags
} from "../controllers/researchControllers.js";

// Create an express router
const researchRouter = express.Router();
researchRouter.use(bodyParser.json());

// Define routes

/**
 * @route GET /researches/featured
 * @description Get featured researches
 * @access Public (since it's a featured list)
 */
researchRouter.get("/featured", getFeaturedResearches);

/**
 * @route GET /researches/tags?tags=tagsStringCommaSeperated
 * @description Get researches by tags
 * @access Public
 */
researchRouter.get("/tags", getResearchesByTags);

/**
 * @route POST /researches/create
 * @description Create a new research
 * @access Private (authenticated users only)
 */
researchRouter.post("/create", createResearch);

/**
 * @route GET /researches/get-research/:slug
 * @description Get details of a specific research by slug
 * @access Public
 */
researchRouter.get("/get-research/:slug", getResearch);

/**
 * @route PUT /researches/:id
 * @description Update a specific research
 * @access Private (authenticated users only)
 */
researchRouter.put("/:id", updateResearch);

/**
 * @route DELETE /researches/:id
 * @description Delete a specific research
 * @access Private (authenticated users only)
 */
researchRouter.delete("/:id", deleteResearch);

// Export the router
export default researchRouter;
