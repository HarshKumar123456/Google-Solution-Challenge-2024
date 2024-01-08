import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        googleId: {
            type: String,
        },
    }
    ,
    {
        timestamps: true,
    });

UserSchema.plugin(findOrCreate);
const User = mongoose.model("USER", UserSchema);

export default User;