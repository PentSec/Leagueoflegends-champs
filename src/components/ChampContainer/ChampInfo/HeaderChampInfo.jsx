import { Image } from '@nextui-org/react'
import React from 'react'
import ReactImageGallery from 'react-image-gallery'
import { laneIcon } from '@/utils'

const HeaderChampInfo = ({ imagesValue, champValue, lanesValue }) => {
    return (
        <>
            <div className="absolute top-1 left-0 w-full h-full z-10 bg-gradient-to-r from-[#0d1117] from-15% via-[#0d1117]/30 via-40% to-slate-500/0 to-90% rounded-lg pointer-events-none" />

            <ReactImageGallery
                items={imagesValue}
                autoPlay={true}
                thumbnailPosition="right"
                slideInterval={4500}
            />

            <div className="z-20 flex flex-col items-start justify-start gap-2 p-4 pointer-events-none lg:absolute left-40 text-start">
                <h1 className="font-extrabold text-white uppercase text-7xl font-beaufortBold">
                    {champValue.name}
                </h1>
                <span className="text-4xl italic font-bold text-teal-400 uppercase font-beaufortBold">
                    {champValue.title}
                </span>

                <div className="grid grid-cols-3 gap-4 mt-2 font-spiegel text-default-foreground">
                    <p>{`${champValue.lore.split(' ').slice(0, 70).join(' ')}${
                        champValue.lore.split(' ').length > 70 ? '...' : ''
                    }`}</p>
                </div>
                <h2 className="font-semibold text-gray-200">Position</h2>
                <ul>
                    {lanesValue.length > 0 ? (
                        lanesValue.map(({ lane, rate }) => (
                            <li key={lane}>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={laneIcon[lane]}
                                            alt={lane}
                                            className="flex-shrink-0 w-6 h-6 bg-transparent text-tiny"
                                        />

                                        <span className="flex flex-col text-tiny">
                                            {' '}
                                            Pick Rate {(rate * 100).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Dont have date for this champion</p>
                    )}
                </ul>
            </div>
        </>
    )
}

export default HeaderChampInfo
