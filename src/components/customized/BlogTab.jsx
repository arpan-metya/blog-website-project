import { useSelector } from "react-redux";
import { Container } from ".."
import parse from 'html-react-parser'
import storageService from "../../appwrite/storage"

function BlogTab({ blog }) {

  return (
    <Container flexBox flexProp="!items-start !justify-start"
      className="rounded-2xl px-5 py-5 max-h-80 overflow-hidden">
      <h1 className="text-2xl capitalize text-fuchsia-600">
        {blog.authorName.toLowerCase()}
      </h1>
      <Container flexBox flexProp="!items-start" className="space-x-2">
        {blog.image.length > 0 &&
          <Container flexBox flexProp="basis-1/3" className="rounded-lg overflow-hidden max-h-36">
            <img src={storageService.getPreviewFile(blog.image[0])}
              alt="" className="w-full h-full object-cover" />
          </Container>}
        <Container className="sm:space-y-1 flex-1 justify-self-stretch 
          dark:text-neutral-300">
          <h2 className="text-2xl dark:text-neutral-200">{blog.title}</h2>
          <div className="truncate">
            {parse(blog.content)}
          </div>
          <h3 className="text-xl dark:text-neutral-400 truncate">
            {blog.slug.map(slug => '#' + slug).join(' ')}
          </h3>
        </Container>
      </Container>
    </Container>
  );
}

export default BlogTab;