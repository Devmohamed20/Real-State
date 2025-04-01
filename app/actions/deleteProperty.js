"use server";
import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";
import Property from "@/models/PropertyModel";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property Not Found");
  }
  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("You can't delete what you don't own ");
  }

  // Extract public ID from image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("Real-State-images/" + publicId);
    }
  }

  await Property.deleteOne({ _id: property });

  revalidatePath("/", "layout");
}

export default deleteProperty;
