import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogsData: [],
  blogData: {},
  isBlogsPresent: false
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlogs: (state, action) => {
      state.isBlogsPresent = true
      state.blogsData = action.payload
    },
    addBlog: (state, action) => {
      state.blogData = { ...state.blogData, [action.payload.$id]: action.payload }
    },
    createBlog: (state, action) => {
      state.blogsData = [...state.blogsData, action.payload]
      state.blogData = { ...state.blogData, [action.payload.$id]: action.payload }
    },
    updateBlog: (state, action) => {
      const blogId = action.payload.$id
      state.blogsData = state.blogsData.map(blog => (
        blog.$id === blogId ? action.payload : blog
      ))
      state.blogData[blogId] = action.payload
    },
    deleteBlog: (state, action) => {
      state.blogsData = state.blogsData.filter(blog => blog.$id !== action.payload)
      state.isBlogsPresent = (state.blogsData.length > 0)
      delete state.blogData[action.payload]
    },
    refreshBlogs: (state) => {
      state.blogsData = []
      state.isBlogsPresent = false
      state.blogData = {}
    }
  }
})

export const { addBlog, addBlogs, viewBlog, viewBlogs,
  updateBlog, deleteBlog, refreshBlogs, createBlog } = blogsSlice.actions

export const selectBlogsStatus = (state) => state.blogs.isBlogsPresent
export const selectBlogsData = (state) => state.blogs.blogsData

export default blogsSlice.reducer