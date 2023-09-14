import React from 'react'

function PreviewDealModal({ title, link, images, category, shippingCost, price, lastBestPrice, description }) {
  
	const fileToURL = (file) => URL.createObjectURL(file);
	
	return (
		<div className='w-[50vw]'>
			<h1 className='text-4xl font-bold mb-5'> Review your deal </h1>
			<div className='flex flex-col gap-3'>
				<div className="grid-rows-2 col-span-3 border-2 p-2 rounded-lg">
					<p className="font-semibold">Link</p>
					<p className="mt-1">{link}</p>
				</div>
				<div className="grid grid-cols-3 gap-4 border-2 p-2 rounded-lg">
					<h1 className='grid-rows-1 col-span-3 text-xl font-bold'> Basic Info </h1>
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
						<div className='flex gap-3 justify-center'>
						{images.map((image, index) => (
							<div className='w-32 h-32'>
								<img
									key={index}
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
  )
}

export default PreviewDealModal