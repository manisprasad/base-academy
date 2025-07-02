import Link from "../model/Link";
import { Request, Response } from "express";
import { LinkType } from "../schemas/link.schema";
import { ApiResponse, ApiResponseType } from "../utils/response";
import { StatusCodes } from "http-status-codes";

export const saveLinks = async (
  req: Request<{}, {}, LinkType | LinkType[]>,
  res: Response<ApiResponseType<LinkType | LinkType[]>>
) => {
  try {
    const body = req.body;

    if (Array.isArray(body)) {
      const newLinks = body.map((item) => new Link(item));
      await Link.bulkSave(newLinks);
       ApiResponse.success(res, "Links saved successfully", newLinks, StatusCodes.CREATED);
       return;
    }

    const newLink = new Link(body);
    await newLink.save();
     ApiResponse.success(res, "Link saved successfully", newLink, StatusCodes.CREATED);
     return;

  } catch (error) {
    console.error("Error saving link(s):", error);
     ApiResponse.error(res, "Server error while saving link(s)", StatusCodes.INTERNAL_SERVER_ERROR);
     return;
  }
};

export const deleteLinkById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponseType<LinkType>>
) => {
  try {
    const { id } = req.params;
    const deletedLink = await Link.findByIdAndDelete(id);

    if (!deletedLink) {
       ApiResponse.notFound(res, "Link not found");
       return;
    }

    ApiResponse.success(res, "Link deleted successfully", deletedLink);
  } catch (error) {
    console.error("Error deleting link:", error);
    ApiResponse.error(res, "Server error while deleting link");
  }
};

export const blukDeleteLinks = async (
  req: Request<{}, {}, { ids: string[] }>,
  res: Response<ApiResponseType<number>>
) => {
  try {
    const { ids } = req.body;
    const deletedLinks = await Link.deleteMany({ _id: { $in: ids } });

    if (deletedLinks.deletedCount === 0) {
       ApiResponse.notFound(res, "No links found to delete");
       return;
    }

    ApiResponse.success(res, `${deletedLinks.deletedCount} links deleted successfully`, deletedLinks.deletedCount);
  } catch (error) {
    console.error("Error deleting links:", error);
    ApiResponse.error(res, "Server error while deleting links");
  }
};

export const updateLinkById = async (
  req: Request<{ id: string }, {}, LinkType>,
  res: Response<ApiResponseType<LinkType>>
) => {
  try {
    const { id } = req.params;
    const { title, des, link, category } = req.body;

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, des, link, category },
      { new: true, runValidators: true }
    );

    if (!updatedLink) {
       ApiResponse.notFound(res, "Link not found");
       return;
    }

    ApiResponse.success(res, "Link updated successfully", updatedLink);
  } catch (error) {
    console.error("Error updating link:", error);
    ApiResponse.error(res, "Server error while updating link");
  }
};

export const getAllLinks = async (
  req: Request,
  res: Response<ApiResponseType<LinkType[]>>
) => {
  try {
    const links = await Link.find().lean().sort({ createdAt: -1 });
    ApiResponse.success(res, "Links fetched successfully", links);
  } catch (error) {
    console.error("Error fetching links:", error);
    ApiResponse.error(res, "Server error while fetching links");
  }
};
