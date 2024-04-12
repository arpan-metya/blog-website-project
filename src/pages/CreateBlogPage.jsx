import { Container, BlogForm } from "../components";

function CreateBlogPage() {
  return (
    <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700"
      className="flex-1 py-10">
      <BlogForm />
    </Container>
  )
}

export default CreateBlogPage;