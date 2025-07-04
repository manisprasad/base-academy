import {Response, Request} from "express";
import User from "../model/User";
import { ApiResponse } from "../utils/response";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
       ApiResponse.badRequest(res, "User ID is required");
       return;
    }

    const user = await User.findById(userId, "-password -refreshToken").lean();

    if (!user) {
       ApiResponse.notFound(res, "User not found");
       return;
    }

    ApiResponse.success(res, "User profile fetched successfully", user);
    return;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    ApiResponse.error(res, "Server error while fetching user profile");
    return;
  }
}

//Ai generate code (TODO -> Fix the code)
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { name, email, phone } = req.body;

    if (!userId) {
       ApiResponse.badRequest(res, "User ID is required");
       return;
    }

    if (!name || !email || !phone) {
       ApiResponse.badRequest(res, "Name, email and phone are required");
       return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true, select: "-password -refreshToken" }
    ).lean();

    if (!updatedUser) {
       ApiResponse.notFound(res, "User not found");
       return;
    }

    ApiResponse.success(res, "User profile updated successfully", updatedUser);
    return;
  } catch (error) {
    console.error("Error updating user profile:", error);
    ApiResponse.error(res, "Server error while updating user profile");
    return;
  }
}

//AI generated code (TODO -> Fix the code)
export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
       ApiResponse.badRequest(res, "User ID is required");
       return;
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
       ApiResponse.notFound(res, "User not found");
       return;
    }

    ApiResponse.success(res, "User profile deleted successfully");
    return;
  } catch (error) {
    console.error("Error deleting user profile:", error);
    ApiResponse.error(res, "Server error while deleting user profile");
    return;
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password -refreshToken -bio -profileImage -coursesPurchased").lean();
    console.log("Fetched users:", users);
    if (!users || users.length === 0) {
      ApiResponse.notFound(res, "No users found");
      return;
    }

    ApiResponse.success(res, "Users fetched successfully", users);
    return;
  } catch (error) {
    console.error("Error fetching all users:", error);
    ApiResponse.error(res, "Server error while fetching all users");
    return;
  }
}

