import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = () => {
  // Carousel settings
  const carouselSettings = {
    dots: true, // Shows dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Slide transition speed in ms
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable auto play
    autoplaySpeed: 3000, // Time between auto play in ms
    nextArrow: (
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
        &#8594; {/* Right arrow symbol */}
      </button>
    ),
    prevArrow: (
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
        &#8592; {/* Left arrow symbol */}
      </button>
    ),
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...carouselSettings}>
        {/* Slide 1 */}
        <div>
          <img
            src="bags.jpg"
            alt="Slide 1"
            className="w-full h-[900px] object-cover" // Set fixed height for all images
          />
        </div>
        
        {/* Slide 2 */}
        <div>
          <img
            src="glasses.png"
            alt="Slide 2"
            className="w-full h-[900px] object-cover" // Set fixed height for all images
          />
        </div>
        {/* Slide 3 */}
        <div>
          <img
            src="jackets.jpg"
            alt="Slide 3"
            className="w-full h-[900px] object-cover" // Set fixed height for all images
          />
        </div>
        {/* Slide 4 */}
        <div>
          <img
            src="tshirts.jpg"
            alt="Slide 4"
            className="w-full h-[900px] object-cover" // Set fixed height for all images
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;