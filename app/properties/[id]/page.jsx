import PropertyHeaderImage from "@/app/_components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/app/_components/PropertyDetails";
import PropertyContactForm from "@/app/_components/PropertyContactForm";
import ShareButtons from "@/app/_components/ShareButtons";
import BookMarkButton from "@/app/_components/BookMarkButton";
import PropertyImages from "@/app/_components/PropertyImages";

const PropertyPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();

  return (
    <>
      <PropertyHeaderImage image={property.images.at(0)} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section class="bg-blue-50">
        <div class="container m-auto py-10 px-6">
          <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Property details */}
            <PropertyDetails property={property} />
            {/* <!-- Sidebar --> */}
            <aside className="space-y-4">
              <BookMarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
