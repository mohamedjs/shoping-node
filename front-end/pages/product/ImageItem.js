import React from 'react'

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