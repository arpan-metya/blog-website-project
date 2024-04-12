import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async registerUser({ name, email, password }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name)
      if (user) {
        return this.loginUser({ email, password })
      }
    } catch (err) {
      console.log('ERROR!', err)
      return false
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (err) {
      console.log('ERROR!', err)
      return { error: err.message }
    }
  }

  async logoutUser() {
    try {
      return await this.account.deleteSessions()
    } catch (err) {
      console.log('ERROR!', err)
      return false
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (err) {
      console.log('ERROR!', err)
      return false
    }
  }

  async getUser(userId) {
    try {
      return await this.account.get(userId)
    } catch (err) {
      console.log('ERROR!', err)
      return false
    }
  }
}

const authService = new AuthService()
export default authService
