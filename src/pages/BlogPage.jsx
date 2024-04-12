import { useEffect, useState } from "react";
import { BlogCard, Container, LoadingIcon } from "../components";
import { useParams } from "react-router-dom";
import databasesService from "../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, deleteBlog } from "../features/blogSlice";
import { selectUserData } from "../features/authSlice";

function BlogPage() {
  const { blogId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(selectUserData)
  const blogData = useSelector(state => state.blogs.blogData[blogId])
  const [isLoading, setIsLoading] = useState(!blogData)
  const [isError, setIsError] = useState(null)
  const [blog, setBlog] = useState(blogData || {})

  const handleDelete = async (id) => {
    await databasesService.deleteBlog(id)
    navigate('/blogs')
    dispatch(deleteBlog(id))
  }

  useEffect(() => {
    (async function fetchData() {
      if (!blogData) {
        try {
          setIsLoading(true)
          setIsError(null)
          const data = await databasesService.readBlog(blogId)
          if (data) {
            setBlog(data)
            dispatch(addBlog(data))
          } else {
            navigate('/')
          }
        } catch (err) {
          setIsError(err)
        } finally {
          setIsLoading(false)
        }
      }
    })()
  }, [dispatch, blogId])

  if (isLoading) {
    return (
      <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700" className="flex-1 py-10">
        <LoadingIcon />
      </Container>
    )
  }

  if (isError) {
    console.log(isError)
    return (
      <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700" className="flex-1 py-10">
        <ErrorCard />
      </Container>
    )
  }

  return (
    <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700"
      className="flex-1 py-10">
      <BlogCard blog={blog} handleDelete={handleDelete} userData={userData} />
    </Container>
  );
}

export default BlogPage;