import express from "express";
import { validateSchmea } from "../middleware/validateSchema";
import { LinkSchema } from "../schemas/link.schema";
import {
  saveLinks,
  deleteLinkById,
  blukDeleteLinks,
  updateLinkById,
  getAllLinks, 
} from "../controller/linkController";

export const linkRoute = express.Router();

//  Routes of links
linkRoute.get("/", getAllLinks);
linkRoute.post("/", validateSchmea(LinkSchema.or(LinkSchema.array())), saveLinks);
linkRoute.put("/:id", validateSchmea(LinkSchema), updateLinkById);
linkRoute.delete("/:id", deleteLinkById);
linkRoute.delete("/", blukDeleteLinks);
