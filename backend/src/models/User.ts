import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    phone: { type: String, required: true },
    activated: { type: Boolean },
    username: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
        return avatar;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

export default mongoose.model("User", UserSchema, "users");
