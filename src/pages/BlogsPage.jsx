import { useEffect, useState } from "react";
import { Container, BlogTab, LoadingIcon, ErrorCard, Button } from "../components";
import { Link } from "react-router-dom";
import databasesService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { addBlogs, refreshBlogs } from "../features/blogSlice"
import {
  selectBlogsStatus, selectBlogsData
} from "../features/blogSlice";
import authService from "../appwrite/auth";

function BlogsPage() {
  const blogsStatus = useSelector(selectBlogsStatus)
  const blogsData = useSelector(selectBlogsData)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(!blogsStatus)
  const [isError, setIsError] = useState(null)
  const [blogs, setBlogs] = useState(blogsData)

  const handleRefresh = () => {
    dispatch(refreshBlogs())
    setIsLoading(true)
  }

  useEffect(() => {
    (async function fetchData() {
      if (!blogsStatus) {
        try {
          setIsError(null)
          const data = await databasesService.readBlogs()
          if (data) {
            dispatch(addBlogs(data))
            setBlogs(data)
          }
        } catch (err) {
          setIsError(err)
        } finally {
          setIsLoading(false)
        }
      }
    })()
  }, [blogsStatus, dispatch])

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
      className="flex-1 py-10" flexProp="!justify-start">

      <Button label="Refresh" bgColor="bg-white dark:bg-neutral-800"
        textColor="text-neutral-800 dark:text-neutral-300"
        className="px-5 pb-3 mb-5 rounded-xl shadow-lg"
        onClick={handleRefresh} />

      <Container variant="fluid"
        className="max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-y-6 items-center">
        {blogs.length > 0 && blogs.map(blog => (
          <Link to={`/blogs/${blog.$id}`} key={blog.$id}
            className="rounded-2xl w-11/12 h-full mx-auto flex items-start pb-3 shadow-md
            bg-gradient-to-br from-white to-neutral-300
            dark:bg-gradient-to-tl dark:from-neutral-800 dark:to-neutral-700">
            <BlogTab blog={blog} />
          </Link>
        ))}
      </Container>

    </Container >
  );
}

export default BlogsPage;