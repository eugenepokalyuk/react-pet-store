import { motion } from 'framer-motion';
import React, { useState } from 'react';
import RunningCat from '../assets/animated/running-cat.gif';

const ImageCarousel: React.FC<{ images: string[], alt?: string }> = ({ images, alt }) => {
    // const [isLoading, setIsLoading] = useState(true);
    // const [currentIndex, setCurrentIndex] = useState(0);

    // const goToPrevious = () => {
    //     const isFirstImage = currentIndex === 0;
    //     const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    //     setCurrentIndex(newIndex);
    // };

    // const goToNext = () => {
    //     const isLastImage = currentIndex === images.length - 1;
    //     const newIndex = isLastImage ? 0 : currentIndex + 1;
    //     setCurrentIndex(newIndex);
    // };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const goToPrevious = () => {
        setIsLoading(true); // Включить лоадер при переключении
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        setIsLoading(true); // Включить лоадер при переключении
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {isLoading && (
                <div
                    className="block bg-gray-200 w-full h-[80vh] rounded-lg object-cover flex items-center justify-center"
                >
                    {/* <p>Loading...</p> */}
                    <div>
                        <img src={RunningCat} alt="" className='w-[100px] h-auto'/>
                    </div>
                </div>
            )}
            <img
                // src={images[currentIndex]}
                // alt={`${alt ? alt : 'carousel'}`}
                // className="block w-full h-[80vh] rounded-lg object-cover"
                src={images[currentIndex]}
                alt={`${alt ? alt : 'carousel'}`}
                className="block w-full h-[80vh] rounded-lg object-cover"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block' }}
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
            </div>
        </div>
    );
};
export default ImageCarousel;