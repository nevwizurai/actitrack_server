import { Router } from "express";
import {
  getActivities,
  addActivity,
  deleteActivity,
  updateActivity,
} from "../controller/activity.controller";

const route = Router();

// Endpoints
route.get("/activities", getActivities);
route.post("/activity", addActivity);
route.delete("/activity/:id", deleteActivity);
route.patch("/activity/:id", updateActivity);

export default route;
