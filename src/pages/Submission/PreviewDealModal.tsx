interface PreviewDealModalProps {
  title: string;
  link: string;
  images: File[];
  category: string;
  shippingCost: number | string;
  price: number | string;
  lastBestPrice: number | string;
  description: string;
}

function PreviewDealModal({
  title,
  link,
  images,
  category,
  shippingCost,
  price,
  lastBestPrice,
  description,
}: PreviewDealModalProps) {
  const fileToURL = (file: File) => URL.createObjectURL(file);

  return (
    <div className="w-[80vw] sm:max-w-[50vw] mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold mb-5">Review your deal</h1>
      <div className="flex flex-col gap-3">
        <div className="grid-rows-2 col-span-3 border-2 p-2 rounded-lg">
          <p className="text-xl font-bold">Link</p>
          <p className="mt-1">{link}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-2 p-2 rounded-lg">
          <h1 className="grid-rows-1 col-span-3 text-xl font-bold">
            Basic Info
          </h1>
          <div className="grid-rows-2 col-span-3">
            <p className="font-semibold">Title</p>
            <p className="mt-1">{title}</p>
          </div>
          <div className="grid-rows-3">
            <p className="font-semibold">Price</p>
            <p className="mt-1">{price}zł</p>
          </div>
          <div className="grid-rows-2">
            <p className="font-semibold">Next Best Price</p>
            <p className="mt-1">{lastBestPrice}zł</p>
          </div>
          <div className="grid-rows-2">
            <p className="font-semibold">Shipping Cost</p>
            <p className="mt-1">{shippingCost}zł</p>
          </div>
          <div className="grid-rows-2">
            <p className="font-semibold">Voucher Code</p>
            <p className="mt-1">-</p>
          </div>
        </div>
        <div className="grid-rows-2 col-span-3 border-2 p-2 rounded-lg">
          <p className="font-semibold">Images</p>
          <div className="flex gap-3 justify-center">
            {images.map((image, index) => (
              <div className="w-32 h-32" key={index}>
                <img
                  src={fileToURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid-rows-2 col-span-3 border-2 p-2 rounded-lg">
          <p className="font-semibold">Description</p>
          <p className="mt-1">{description}</p>
        </div>
        <div className="grid-rows-2 col-span-3 border-2 p-2 rounded-lg">
          <p className="font-semibold">Category</p>
          <p className="mt-1">{category}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewDealModal;
