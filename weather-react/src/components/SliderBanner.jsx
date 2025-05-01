import React from 'react'
import{useState,useEffect} from 'react'
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
const images =[img1,img2,img3];

export default function SliderBanner() {
   
    const[currentIndex,setCurrentIndex] = useState(0);
  


    useEffect(()=>{
        const interval = setInterval(()=>{
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex])

    const prevSlide=()=>{
        setCurrentIndex((prev)=>
            prev===0?images.length-1:prev-1 

        );

    }

    
    const nextSlide = () => {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      };
        
    


  return (
    <div className="w-full max-w-3xl mx-auto relative overflow-hidden rounded-xl shadow-lg">

    <img
      src={images[currentIndex]}
      alt="Slide"
      className="w-full h-96 object-cover transition-all duration-700"
    />
       <button onClick={prevSlide}>prev</button>
       <button onClick={nextSlide}>Next</button>
       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
      
    </div>
  )
}
