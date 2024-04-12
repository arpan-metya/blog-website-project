import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, BlogForm } from "../components";
import { useNavigate } from "react-router-dom";

function UpdateBlogPage() {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const blog = useSelector(state => state.blogs.blogData[blogId])

  useEffect(() => {
    if (!blog) {
      navigate(`/blogs/${blogId}`)
    }
  }, [blogId])

  return (
    <Container flexBox className="flex-1 py-10"
      bgColor="bg-neutral-300 dark:bg-neutral-700">
      <BlogForm blog={blog} />
    </Container>
  );
}

export default UpdateBlogPage;