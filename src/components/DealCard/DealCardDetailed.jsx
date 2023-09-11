import React from 'react'
import ImageSlider from '../ImageSlider'
import DealCardVotes from './DealCardVotes'
import { FiExternalLink } from 'react-icons/fi'
import { MdOutlineLocalShipping } from 'react-icons/md'

const DealCardDetailed = ({ dealId, imageURLs, posted, title, price, nextBestPrice, shippingCost, dealLink, profileUrl, owner, voucherCode}) => {
	
	console.log(imageURLs, "DealCardDetailed")
	
	return (
		<div className='bg-white p-5 flex justify-center items-center rounded-lg w-full max-w-3xl mt-3'>
			<div className='h-64 w-full bg-slate-500 overflow-hidden rounded-xl'>
				<ImageSlider dealId={dealId} imageURLs={imageURLs} />
			</div>
			<div className="bg-white p-4 flex flex-col w-full max-w-3xl">
				<div className="text-sm text-gray-600 flex flex-col items-start gap-3">
					<div className='flex flex-row-reverse w-full justify-between gap-2 items-center'>
						<div>
							<div className='flex flex-col items-center text-lg'>
								{posted && <span> {posted} </span>}
							</div>
						</div>
						<DealCardVotes postId={dealId} />
					</div>
					<div className="text-gray-900 font-bold text-3xl mb-2">{title}</div>
					<div className='flex gap-3 items-center w-full'>
						<p className='text-orange-500 font-bold text-3xl'> {price}zł</p>
						<del className=' text-gray-500 font-bold text-3xl'> {nextBestPrice}zł </del>
						<p className='text-3xl'> -{Math.floor((nextBestPrice - price) / nextBestPrice * 100)}% </p>
						<p className='flex flex-row text-xl text-slate-500 gap-2 items-center ml-auto'>
							<MdOutlineLocalShipping size={30} />
							{shippingCost}zł 
						</p>
					</div>
					<button className='flex border hover:bg-gray-100 transition items-center justify-center rounded-full w-32 h-8'>
						<a className='flex gap-2 items-center' href={dealLink} target='_blank'>
							Go to deal
							<FiExternalLink />
						</a>
					</button>
					<div className="flex items-center justify-between gap-5">
						<div className='flex justify-center items-center'>
							<img className="w-10 h-10 rounded-full mr-4" src={profileUrl} />
							<div className="text-sm">
								<p className="text-gray-900 leading-none">Shared by {owner}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default DealCardDetailed