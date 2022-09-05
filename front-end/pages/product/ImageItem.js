import React from 'react'
import Image from 'next/image'
const ImageItem = ({image}) => {
  return (
        <img
            src={image}
            alt={image}
            className="w-[100%] h-[640px] responsive"
        />
)
}

export default ImageItem