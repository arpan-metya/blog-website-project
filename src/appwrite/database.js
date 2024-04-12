import config from "../config/config";
import { Client, Databases, Query, ID } from "appwrite";
import authService from "./auth";
import storageService from "./storage";

export class DatabasesService {
  client = new Client();
  databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
  }

  async createBlog({ title, slug, content, image, status, authorId, authorName }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        { title, slug, content, image, status, authorId, authorName }
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async updateBlog(id, { title, slug, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
        { title, slug, content, image, status }
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async deleteBlog(id) {
    try {
      const data = await this.readBlog(id)
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      )
      if (data?.image.length) {
        await Promise.all(data.image.map(async img => {
          await storageService.deleteFile(img)
        }))
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async readBlog(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async readBlogs(query = [Query.equal('status', ['active'])]) {
    try {
      const blogsData = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        query
      )
      return blogsData.documents
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

const databasesService = new DatabasesService()
export default databasesService