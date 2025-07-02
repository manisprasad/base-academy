



// components/ImageCarousel.tsx

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    title: "Slide One",
    description: "This is an optional description.",
  },
  {
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
    title: "Slide Two",
    description: "Another optional overlay.",
  },
  {
    image: "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(next, 5000); // Auto-slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-[1700px] mx-auto h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-xl scale-110 brightness-50"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      />

      {/* Main Image */}
      <img
        src={slides[current].image}
        alt="Carousel Slide"
        className="relative z-10 w-full h-full object-cover object-center"
      />

      {/* Optional overlay content */}
      {(slides[current].title || slides[current].description) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-8 bg-gradient-to-t from-black/40 to-transparent text-white text-center">
          {slides[current].title && (
            <h2 className="text-2xl font-semibold">{slides[current].title}</h2>
          )}
          {slides[current].description && (
            <p className="text-sm mt-2">{slides[current].description}</p>
          )}
        </div>
      )}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}








































// import React, { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button" // Adjust this import based on your setup

// const Carousel: React.FC = () => {
//     const [currentIndex, setCurrentIndex] = useState(0)

//     const carouselImages: string[] = [
//         "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
//     ]

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) =>
//                 prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
//             )
//         }, 3000)

//         return () => clearInterval(interval)
//     }, [carouselImages.length])

//     const goToPrevious = () => {
//         setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1)
//     }

//     const goToNext = () => {
//         setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1)
//     }

//     return (
//         <div className="relative w-full flex items-center mx-auto overflow-hidden h-[60vh] border-2 shadow-2xl">
//             {/* Blurred Background Image */}
//             <div className="absolute inset-0 -z-10">
//                 <img
//                     src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80"
//                     alt="Education background"
//                     className="w-full h-full object-cover blur-xs brightness-75"
//                 />
//             </div>

//             {/* Carousel Content */}
//             <div className="relative z-10 px-4">
//                 {/* Desktop Layout */}
//                 <div className="hidden md:flex items-center justify-center  gap-4 lg:gap-6 h-[60vh] min-h-[500px]">
//                     {/* Left Static Image */}
//                     <div className="w-1/4 max-h-[60vh] flex-shrink-0">
//                         <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
//                             <img
//                                 src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
//                                 alt="Left static image"
//                                 className="object-contain w-full h-full transition-opacity duration-500 "
//                             />
//                         </div>
//                     </div>

//                     {/* Carousel Image */}
//                     <div className="relative w-1/2 flex-shrink-0">
//                         <div className="relative max-h-96 h-full rounded-lg overflow-hidden shadow-xl">
//                             <img
//                                 src={carouselImages[currentIndex]}
//                                 alt={`Carousel image ${currentIndex + 1}`}
//                                 className="object-contain w-full h-full transition-opacity duration-500 "

//                             />

//                             {/* Buttons */}
//                             <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//                                 onClick={goToPrevious}
//                             >
//                                 <ChevronLeft className="h-4 w-4" />
//                             </Button>

//                             <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//                                 onClick={goToNext}
//                             >
//                                 <ChevronRight className="h-4 w-4" />
//                             </Button>

//                             {/* Dots */}
//                             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                                 {carouselImages.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"
//                                             }`}
//                                         onClick={() => setCurrentIndex(index)}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Static Image */}
//                     <div className="w-1/4 flex-shrink-0">
//                         <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
//                             <img
//                                 src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
//                                 alt="Right static image"
//                                 className="object-contain w-full h-full transition-opacity duration-500 "

//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Layout */}
//                 <div className="md:hidden space-y-4">
//                     <div className="relative">
//                         <div className="relative h-[50vh] min-h-[300px] rounded-lg overflow-hidden shadow-xl">
//                             <img
//                                 src={carouselImages[currentIndex]}
//                                 alt={`Carousel image ${currentIndex + 1}`}
//                                 className="object-cover w-full h-full transition-opacity duration-500"
//                             />

//                             {/* Buttons */}
//                             <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//                                 onClick={goToPrevious}
//                             >
//                                 <ChevronLeft className="h-4 w-4" />
//                             </Button>

//                             <Button
//                                 variant="outline"
//                                 size="icon"
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
//                                 onClick={goToNext}
//                             >
//                                 <ChevronRight className="h-4 w-4" />
//                             </Button>

//                             {/* Dots */}
//                             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                                 {carouselImages.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"
//                                             }`}
//                                         onClick={() => setCurrentIndex(index)}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Static Images Side by Side */}
//                     <div className="flex gap-4">
//                         <div className="flex-1">
//                             <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
//                                 <img
//                                     src="/placeholder.svg?height=160&width=200"
//                                     alt="Left static image"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex-1">
//                             <div className="relative h-40 rounded-lg overflow-hidden shadow-lg">
//                                 <img
//                                     src="/placeholder.svg?height=160&width=200"
//                                     alt="Right static image"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Assistance Banner */}

//             </div>
//         </div>
//     )
// }

// export default Carousel
