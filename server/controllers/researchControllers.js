// Import necessary modules
import slugify from "slugify";
import Research from "../models/researchModel.js";

// Function to handle fetching featured researches
const getFeaturedResearches = async (req, res) => {
    try {
        const featuredResearches = await Research.find({ featured: true });

        res.status(200).json({
            success: true,
            message: "Successfully got featured researches",
            count: featuredResearches.length,
            data: featuredResearches,
        });
    } catch (error) {
        console.error("Error fetching featured researches:", error);
        let errorMessage = "Internal Server Error";

        if (error.name === "MongoError" && error.code === 18) {
            errorMessage = "MongoDB Connection Error";
        }

        res.status(500).json({ success: false, message: errorMessage, error: error.message });
    }
};

// Function to handle fetching researches by tags
const getResearchesByTags = async (req, res) => {
    const { tags } = req.query;

    if (!tags) {
        return res.status(400).json({ success: false, message: 'Tags parameter is required' });
    }

    const tagsArray = tags.split(',');

    try {
        const researches = await Research.find({
            tags: { $in: tagsArray }
        });

        res.status(200).json({ success: true, message: "Successfully got all researches having any of the tags requested", data: researches });
    } catch (error) {
        console.error("Error fetching researches by tags:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const createResearch = async (req, res) => {
    let { title, content, author, categories, tags, collaborativeAuthors, citations, media } = req.body;

    // Check if required fields are present
    if (!title || !content || !author) {
        return res.status(400).json({
            success: false,
            message: "Title, content, and author are required fields.",
        });
    }

    // Validate and convert categories to lowercase if present
    if (categories) {
        if (!Array.isArray(categories)) {
            return res.status(400).json({
                success: false,
                message: "Categories must be an array.",
            });
        }
        categories = categories.map(category => category.toLowerCase());
    }

    // Validate and convert tags to lowercase if present
    if (tags) {
        if (!Array.isArray(tags)) {
            return res.status(400).json({
                success: false,
                message: "Tags must be an array.",
            });
        }
        tags = tags.map(tag => tag.toLowerCase());
    }

    // Generate slug from title
    const slug = slugify(title, {
        lower: true,
        remove: /[^a-zA-Z0-9\s]/g,
    });

    try {
        // Create a new research with the provided data
        const newResearch = await Research.create({
            title,
            slug,
            content,
            author,
            categories,
            tags,
            collaborativeAuthors,
            citations,
            media,
        });

        res.status(201).json({
            success: true,
            message: "Successfully created research",
            data: newResearch,
        });
    } catch (error) {
        console.error("Error creating research:", error);

        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            res.status(400).json({ success: false, message: error.message });
        } else if (error.name === 'MongoError' && error.code === 11000) {
            // Handle unique constraint violation (duplicate key error)
            const fieldName = Object.keys(error.keyValue)[0];
            const errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is not unique. Choose a different ${fieldName}.`;
            res.status(400).json({ success: false, message: errorMessage });
        } else {
            // Handle other types of errors
            res.status(500).json({ success: false, message: error.message });
        }
    }
};


// Function to handle fetching a specific research by slug
const getResearch = async (req, res) => {
    try {
        const research = await Research.findOne({ slug: req.params.slug }).populate("collaborativeAuthors").populate("author");
        if (!research) {
            return res.status(404).json({ success: false, message: "Research not found" });
        }
        res.status(200).json({ success: true, message: "Successfully got research", data: research });
    } catch (error) {
        console.error("Error fetching research:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


const updateResearch = async (req, res) => {
    const allowedUpdates = ['title', 'content', 'categories', 'tags', 'collaborativeAuthors', 'citations', 'media'];

    // Check if the provided updates are allowed
    const isValidUpdate = Object.keys(req.body).every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).json({
            success: false,
            message: "Invalid updates. Only the following fields can be updated: title, content, categories, tags, collaborativeAuthors, citations, media",
        });
    }

    try {
        const research = await Research.findById(req.params.id);

        if (!research) {
            return res.status(404).json({ success: false, message: "Research not found" });
        }

        // Destructure the request body for easier updates
        const { title, content, categories, tags, collaborativeAuthors, citations, media } = req.body;

        // Update fields individually, regenerate slug if title is updated
        if (title) {
            research.title = title;
            research.slug = slugify(title, { lower: true, remove: /[^a-zA-Z0-9\s]/g });
        }

        if (content) research.content = content;
        if (categories) research.categories = categories;
        if (tags) research.tags = tags;
        if (collaborativeAuthors) research.collaborativeAuthors = collaborativeAuthors;
        if (citations) research.citations = citations;
        if (media) research.media = media;

        // Save the updated research
        const updatedResearch = await research.save();

        res.status(200).json({ success: true, message: "Successfully updated research", data: updatedResearch });
    } catch (error) {
        console.error("Error updating research:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


// Function to handle deleting a specific research
const deleteResearch = async (req, res) => {
    try {
        const deletedResearch = await Research.findByIdAndDelete(req.params.id);
        if (!deletedResearch) {
            return res.status(404).json({ success: false, message: "Research not found" });
        }
        res.status(200).json({ success: true, message: "Research deleted successfully" });
    } catch (error) {
        console.error("Error deleting research:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export {
    getFeaturedResearches,
    getResearchesByTags,
    createResearch,
    getResearch,
    updateResearch,
    deleteResearch
};
