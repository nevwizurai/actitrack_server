import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startAt: {
    type: Date,
    default: () => Date.now(),
  },
  endAt: {
    type: Date,
    default: null,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("activity", activitySchema);
