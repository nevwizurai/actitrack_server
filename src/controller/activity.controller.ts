// Import
import { Request, Response } from "express";
import model from "../model/activity.model";
import { checkValidId } from "../util/objectid";

// Error catch
const errorList = {
  empty: {
    code: 200,
    message: "Empty data retrieved",
  },
  invalidId: {
    code: 401,
    message: "ID is invalid, unable to process",
  },
  idNotFound: {
    code: 404,
    message: "No registered activity with such ID",
  },
};

// Get ALL activities
export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetching the data
    const data = await model.find().sort({ startAt: -1 });

    // Check if data is empty
    if (data.length === 0) throw errorList.empty;

    // ...else return fetched data
    res.status(200).json({ action: "get activities", data });
  } catch (error: any) {
    // Error handling
    res.status(error.code || 500).json({ err: error.message, action: "get activities" });
  }
};

// Add new activity
export const addActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    // Creating new model data
    const newData = new model({ name: req.body.name });

    // Saving data to database
    const data = await newData.save();

    // Returning newly added data
    res.status(201).json({ action: "add activity", data });
  } catch (error: any) {
    // Error handling
    res.status(error.code || 500).json({ err: error.message, action: "add activity" });
  }
};

// Delete existing activity
export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extracting and validating Id before query
    const id = req.params.id;
    if (!checkValidId(id)) throw errorList.invalidId;

    // Deleting the data by Id and store the value
    const data = await model.findByIdAndDelete(id);

    // Check if the data with provided Id is exist
    if (!data) throw errorList.idNotFound;

    // ...else return the deleted values
    res.status(200).json({ action: "delete activity", data });
  } catch (error: any) {
    // Error handling
    res.status(error.code || 500).json({ err: error.message, action: "delete activity" });
  }
};

// Update activity status
export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extracting and validating Id before query
    const id = req.params.id;
    if (!checkValidId(id)) throw errorList.invalidId;

    // Updating status and end time based on Id
    const status: boolean = req.body.status;
    const data = await model.findByIdAndUpdate(id, { completed: status, endAt: Date.now() });

    // Check if the data with provided Id is exist
    if (!data) throw errorList.idNotFound;

    // ...else return the deleted values
    res.status(200).json({ action: "update activity", data });
  } catch (error: any) {
    // Error handling
    res.status(error.code || 500).json({ err: error.message, action: "update activity" });
  }
};
