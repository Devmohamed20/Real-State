"use server";

import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

async function updateProperty(propertyId, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // very ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name != "");
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      email: formData.get("seller_info.email"),
      name: formData.get("seller_info.name"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updateProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updateProperty._id}`);
}

export default updateProperty;
