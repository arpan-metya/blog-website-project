import { useCallback, useEffect, useState } from "react";
import {
  Container, Input, RTE, Button, Select,
  FileInput, PreviewBox, ErrorCard, LoadingIcon
} from "..";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import databasesService from "../../appwrite/database";
import storageService from "../../appwrite/storage";
import {
  isFilesLengthValid, isFilesSizeValid, isFilesTypeValid
} from "../../utils/filesValidation";
import { selectUserData } from "../../features/authSlice";
import { createBlog, updateBlog } from "../../features/blogSlice"

function BlogForm({ blog }) {
  const userData = useSelector(selectUserData)
  const [preview, setPreview] = useState(blog?.image || [])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const statusOptions = ['active', 'inactive']
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, control, handleSubmit,
    watch, setValue, formState: { errors } } = useForm({
      defaultValues: {
        title: blog?.title || '',
        status: blog?.status ? blog.status : 'active',
        content: blog?.content || '',
        slug: blog?.slug.join(' ') || '',
      }
    })

  const handleSlug = useCallback((val) => {
    return val.split(' ').filter(el => el).join(' ')
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', handleSlug(value.title), { shouldValidate: true })
        handleSlug(value.title)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, handleSlug, setValue])

  const handleFileChange = useCallback((e) => {
    const images = [...e.target.files]
    if (!isFilesLengthValid(images) || !isFilesSizeValid(images) || !isFilesTypeValid(images)) {
      setValue('image', '')
      return
    }
    setPreview(images.map(file => URL.createObjectURL(file)))
  }, [])

  const uploadFiles = async (files) => {
    try {
      const images = await Promise.all(files.map(async file => (
        await storageService.uploadFile(file)
      )))
      return images.map(img => img.$id)
    } catch (err) {
      setError(err)
      return []
    }
  }

  const deleteFiles = async (files) => {
    try {
      files.length && await Promise.all(files.map(async img => {
        await storageService.deleteFile(img)
      }))
      return true
    } catch (err) {
      setError(err)
      return false
    }
  }

  const onSubmit = async (data) => {
    setError(null)
    setIsLoading(true)
    if (!blog) {
      const images = await uploadFiles([...data.image])
      const blogData = await databasesService.createBlog({
        ...data, image: images, slug: data.slug.split(' '),
        authorId: userData.$id, authorName: userData.name
      })
      if (blogData) {
        dispatch(createBlog({ ...blogData }))
        navigate(`/blogs/${blogData.$id}`)
      } else {
        await deleteFiles(images)
        navigate('/')
        alert('Sorry, data upload failed')
      }
    } else {
      const images = []
      if (data.image.length) {
        await deleteFiles(blog.image)
        const res = await uploadFiles([...data.image])
        res.length && images.push(...res)
      } else {
        images.push(...blog.image)
      }
      const blogData = await databasesService.updateBlog(blog.$id, {
        ...data, image: images, slug: data.slug.split(' '),
        authorId: userData.$id, authorName: userData.name
      })
      if (blogData) {
        console.log(blogData)
        dispatch(updateBlog({ ...blogData }))
        navigate(`/blogs/${blogData.$id}`)
      } else {
        await deleteFiles(images)
        navigate('/')
        alert('Sorry, data upload failed')
      }
    }
  }


  if (error) {
    console.log(error)
    return (
      <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700" className="flex-1 py-10">
        <ErrorCard />
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container flexBox bgColor="bg-neutral-300 dark:bg-neutral-700" className="flex-1 py-10">
        <LoadingIcon />
      </Container>
    )
  }

  return (
    <>
      <Container variant="fluid">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}>

          <Container width="w-5/6" bgColor="bg-white dark:bg-neutral-800"
            className="mx-auto p-5 grid grid-cols-1 lg:grid-cols-2 gap-5 rounded-xl">

            <Container>
              <Input label="Title" {...register('title', {
                required: 'title is required'
              })} />
              {errors?.title &&
                <p className="w-full text-red-500 text-center flex justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                  {errors.title.message}</p>}
              <Input label="Slug" {...register('slug', {
                required: 'slug is required'
              })} />
              {errors?.slug &&
                <p className="w-full text-red-500 text-center flex justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                  {errors.slug.message}</p>}
              <Select label="Status" options={statusOptions}
                {...register('status', {
                  required: 'status is required'
                })} />
              {errors?.status &&
                <p className="w-full text-red-500 text-center flex justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                  {errors.status.message}</p>}
            </Container>

            <Container>
              <FileInput label="Choose Image" className="mb-3" name="image" accept="image/*"
                {...register('image')} multiple onChange={handleFileChange} />
              <RTE name={'content'} control={control} defaultVal={blog?.content}
                rules={{
                  ...register('content', {
                    required: 'content is required',
                    maxLength: {
                      value: 2000,
                      message: 'content must be less than 2000 characters'
                    }
                  })
                }} />
              {errors?.content &&
                <p className="w-full text-red-500 text-center flex justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                  {errors.content.message}</p>}
            </Container>

            <Container className="lg:col-span-2">
              {preview.length && <PreviewBox images={preview} />}
            </Container>

            <Container flexBox className="lg:col-span-2 pb-5">
              <Button label="Submit" className="text-md w-full max-w-32"
                bgColor="bg-fuchsia-600" textColor="text-white" />
            </Container>
          </Container>

        </form>
      </Container>
    </>
  );
}

export default BlogForm;