import { useState } from "react";
import { Container } from "..";
import storageService from "../../appwrite/storage";

function Carousel({ images }) {
  const [index, setIndex] = useState(0)
  const length = images.length
  const handlePrev = () => {
    setIndex(prev => prev === 0 ? length - 1 : prev - 1)
  }
  const handleNext = () => {
    setIndex(prev => prev === length - 1 ? 0 : prev + 1)
  }

  return (
    <Container height="h-screen max-h-64 relative" className="shadow-lg">

      <Container bgColor="bg-black" flexBox flexProp="!flex-row !gap-0 !justify-start"
        className="h-full overflow-hidden rounded-3xl">
        {images.map(image => (
          <Container key={image} bgColor="bg-neutral-900"
            className="h-full w-full flex-none trnsition duration-500"
            style={{ translate: `${- index * 100}%` }}>
            <img src={storageService.getPreviewFile(image)} alt="blogImage" className="w-full h-full object-contain" />
          </Container>
        ))}
      </Container>

      <Container className={`${length <= 1 && 'hidden'}`}>
        <button onClick={handlePrev}
          className="absolute top-0 left-0 h-full rounded-s-3xl transition duration-250 focus-visible:bg-white hover:bg-white focus-visible:bg-opacity-25 hover:bg-opacity-25 p-2 group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 group-focus-visible:animate-squish group-hover:animate-squish">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        <button onClick={handleNext}
          className="absolute top-0 right-0 h-full rounded-e-3xl transition duration-250 focus-visible:bg-white hover:bg-white focus-visible:bg-opacity-25 hover:bg-opacity-25 p-2 group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 group-focus-visible:animate-squish group-hover:animate-squish">
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </Container>

      <Container flexBox flexProp="!flex-row" bgColor=""
        className="absolute bottom-0 rounded-b-3xl py-3 space-x-2">
        {images.length && images.map((_, idx) => (
          <button key={idx}
            className={`p-1 bg-neutral-100 ring-1 ring-offset-1 ring-neutral-100 ring-offset-neutral-800 rounded-full
            tr ${index === idx && 'bg-red-500'} transition focus-visible:scale-150 hover:scale-150`}
            onClick={() => setIndex(idx)}></button>
        ))}
      </Container>
    </Container>
  );
}

export default Carousel;