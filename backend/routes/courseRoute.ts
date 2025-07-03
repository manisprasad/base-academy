// routes/courseRoute.ts
import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController";
import verifyJWT from "../middleware/verifyJWT";
import verifyRole from "../middleware/verifyRoles";
import { Roles } from "../config/roleList";

const courseRoute = express.Router();

courseRoute.post("/", verifyJWT, verifyRole(Roles.Teacher), createCourse);
courseRoute.get("/", getAllCourses);
courseRoute.get("/:id", getCourseById);
courseRoute.put("/:id", verifyJWT, verifyRole(Roles.Teacher), updateCourse);
courseRoute.delete("/:id", verifyJWT, verifyRole(Roles.Teacher), deleteCourse);

export default courseRoute;