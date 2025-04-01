import Image from "next/image";

const PropertyImages = ({ images }) => {
  console.log("images", images);
  return (
    <section className="bg-blue-50 p-4">
      <div className="cotainer mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl "
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`col-span-1 ${
                    images.length % 2 !== 0 && index === images.length - 1
                      ? "last:col-span-2"
                      : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    className="object-cover h-[400px] mx-auto w-full rounded-xl "
                    width={1800}
                    height={400}
                    property={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
