import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ImageCarousel: React.FC<{ images: string[], alt?: string }> = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <img
                src={images[currentIndex]}
                alt={`${alt ? alt : 'carousel'}`}
                className="block w-full h-auto rounded-lg"
            />
            <div className="flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='flex items-center justify-center p-1 px-2 rounded bg-[#3b444b]/80 mt-4 text-white'
                    onClick={goToPrevious}
                >
                    Previous
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='flex items-center justify-center p-1 px-2 rounded bg-[#3b444b]/80 mt-4 text-white'
                    onClick={goToNext}
                >
                    Next
                </motion.button>
                {/* <button
                    onClick={goToPrevious}
                    className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-l-lg p-2 mx-1"
                >
                    Previous
                </button>
                <button
                    onClick={goToNext}
                    className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-r-lg p-2 mx-1"
                >
                    Next
                </button> */}
            </div>
        </div>
    );
};
export default ImageCarousel;