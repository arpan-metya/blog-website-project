import { Container } from "..";
import storageService from "../../appwrite/storage";

function PreviewBox({ images }) {

  return (
    <Container className={
      `${images.length ? 'h-fit' : 'h-0'} transition-[height] duration-500 p-5
      grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-5`
    }>
      {images.map(image => (
        <Container key={image} flexBox className="selection-none group h-full w-full relative overflow-hidden">
          <img src={/^blob:/.test(image) ? image : storageService.getPreviewFile(image)} alt="" className="object-cover h-32 w-full" />
        </Container>
      ))
      }
    </Container >
  );
}

export default PreviewBox;