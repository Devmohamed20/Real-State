"use server";

import connectDB from "@/config/database";
import UserModel from "@/models/UserModel";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await UserModel.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
