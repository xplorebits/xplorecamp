import mongoose from "mongoose";

export default function () {
  mongoose.connect(process.env.XPLORECAMP_MONGODB_URI || '')
}
