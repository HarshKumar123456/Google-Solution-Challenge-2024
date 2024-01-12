import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            unique: [true,"This title already Exists.Please Choose an unique title."]
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true,
            unique: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
            required: [true, "Author is required"],
        },
        categories: [{
            type: String,
            trim: true,
        }],
        tags: [{
            type: String,
            trim: true,
        }],
        collaborativeAuthors: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER",
        }],
        featured: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
        reviews: [{
            reviewer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "USER",
            },
            comment: {
                type: String,
                trim: true,
            },
            rating: {
                type: Number,
                min: [1, "Rating must be at least 1"],
                max: [5, "Rating must be at most 5"],
            },
        }],
        citations: [{
            type: String,
            trim: true,
        }],
        media: [{
            type: String, 
        }],
    },
    {
        timestamps: true,
    }
);


const Research = mongoose.model("RESEARCH", ResearchSchema);

export default Research;
