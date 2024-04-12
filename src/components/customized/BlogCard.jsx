import { Container, Carousel, Button } from ".."
import parse from 'html-react-parser'
import { Link } from "react-router-dom"

function BlogCard({ blog, handleDelete, userData }) {

  return (
    <Container width="w-11/12" flexBox
      className="p-5 mx-auto rounded-lg max-w-screen-md space-y-5">

      <Container bgColor="bg-white dark:bg-neutral-800"
        className="px-5 py-3 text-xl md:text-2xl shadow-lg 
          rounded-3xl text-fuchsia-600 capitalize text-center">
        <h1>{blog.authorName.toLowerCase()}</h1>
      </Container>

      {blog.image.length > 0 && <Carousel images={blog.image} />}

      <Container flexBox flexProp="md:flex-row !items-stretch !gap-8">
        <Container bgColor="bg-white dark:bg-neutral-800"
          className="px-8 py-5 text-sm md:text-md shadow-lg 
            rounded-3xl dark:text-neutral-300 capitalize flex-1">
          <h2 className="text-lg md:text-xl dark:text-neutral-200">{blog.title}</h2>
          <h2 className="text-md md:text-lg dark:text-neutral-400">
            {blog.slug.map(slug => '#' + slug).join(' ')}
          </h2>
          {parse(blog.content)}
        </Container>

        {userData.$id === blog.authorId &&
          <Container flexBox flexProp="!flex-row" bgColor="bg-white dark:bg-neutral-800"
            className="px-8 py-5 text-sm md:text-md shadow-lg 
            rounded-3xl dark:text-neutral-300 capitalize basis-1/3 space-x-5">
            <Link to={`/blogs/${blog.$id}/update`}>
              <Button label="Update" bgColor="bg-fuchsia-500" textColor="text-white" />
            </Link>
            <Button onClick={() => handleDelete(blog.$id)} label={"Delete"} bgColor="bg-fuchsia-500" textColor="text-white" />
          </Container>
        }

      </Container>

    </Container >
  );
}

export default BlogCard;