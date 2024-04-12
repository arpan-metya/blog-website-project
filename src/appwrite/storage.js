import config from "../config/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)
    this.storage = new Storage(this.client)
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  getPreviewFile(fileId) {
    try {
      return this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  downloadFile(fileId) {
    try {
      return this.storage.downloadFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      )
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async updateFile(idList, fileList) {
    try {
      await Promise.all(idList.map(async img => {
        await this.deleteFile(img.id)
      }))
      const images = await Promise.all(fileList.map(async img => (
        await this.uploadFile(img)
      )))
      return images.map(img => img.$id)
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

const storageService = new StorageService()
export default storageService