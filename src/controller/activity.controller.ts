import { Request, Response } from "express";
import model from "../model/activity.model";
import { checkValidId } from "../util/objectid";

export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await model.find();
    data.length > 0
      ? res.status(200).json({ msg: "Get Activities success", data })
      : res.status(200).json({ msg: "Empty data retrieved", isEmpty: true });
  } catch (error: any) {
    res.status(500).json({ msg: "Get Activity failed", err: error.message });
  }
};

export const addActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name as string;
    const newData = new model({ name });
    const data = await newData.save();
    res.status(201).json({ msg: "Add Activity success", data });
  } catch (error: any) {
    res.status(500).json({ msg: "Add Activity failed", err: error.message });
  }
};

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!checkValidId(id)) throw { message: "Tampered activity ID, unable to process" };

    const data = await model.findByIdAndDelete(id);
    if (!data) throw { message: "Activity with such ID does not exist" };
    res.status(200).json({ msg: "Delete Activity success", data });
  } catch (error: any) {
    res.status(500).json({ msg: "Delete Activity failed", err: error.message });
  }
};

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!checkValidId(id)) throw { message: "Tampered activity ID, unable to process" };

    const status = req.body.status as boolean;
    const data = await model.findByIdAndUpdate(id, { completed: status, endAt: Date.now() });
    if (!data) throw { message: "Activity with such ID does not exist" };
    res.status(200).json({ msg: "Update Activity success", data });
  } catch (error: any) {
    res.status(500).json({ msg: "Update Activity failed", err: error.message });
  }
};
