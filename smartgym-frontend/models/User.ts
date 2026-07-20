import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Staff",
    },

    active: {
      type: Boolean,
      default: true,
    },

    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);
