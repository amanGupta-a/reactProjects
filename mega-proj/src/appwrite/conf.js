import { Client, ID, Databases, Query, Storage } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title,slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("appwrite :: service::createPost::error", error);
            return false;
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite::service::updatePost::error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite::service::deletePost::error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite::service::error::getPost", error);
            return false;
        }
    }
    // async listPost() {
    //     try {
    //         return await this.databases.listDocuments(
    //             config.appwriteDatabaseId,
    //             config.appwriteCollectionId,
    //             [
    //                 Query.orderAsc($createdAt)
    //             ]
    //         )
    //     } catch (error) {
    //         console.log("appwrite::service::listPost::error", error);
    //         return false;
    //     }
    // }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(//agar upload kar diya to return kis liye??
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite::service::createFile::error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("appwrite::service::deleteFile::error", error);
            return false;
        }
    }
    getPreview(fileId) {
        if (!fileId) return null;
            return this.bucket.getFileView(
                config.appwriteBucketId,
                fileId
            )
    }
};
const service = new Service();
export default service;