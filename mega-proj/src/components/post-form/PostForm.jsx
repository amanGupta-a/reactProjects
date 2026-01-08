import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Input, Button, RTE, Select } from "../index"
import service from "../../appwrite/conf"

export default function PostForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const submit = async (data) => {
    try {
      let featuredImageId = post?.featuredImage || null

      // upload new image if provided
      if (data.image?.[0]) {
        const file = await service.uploadFile(data.image[0])
        if (file) {
          // delete old image if updating
          if (post?.featuredImage) {
            await service.deleteFile(post.featuredImage)
          }
          featuredImageId = file.$id
        }
      }

      let dbPost

      if (post) {
        // update post
        dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: featuredImageId,
        })
      } else {
        // create post
        dbPost = await service.createPost({
          ...data,
          featuredImage: featuredImageId,
          userID: userData.$id,
        })
      }

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } catch (error) {
      console.error("Post submit error:", error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
    }
    return ""
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue, slugTransform])

  const imagePreview = watch("image")

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left side */}
      <div className="w-2/3 px-2 text-2xl text-center">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 "
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right side */}
      <div className="w-1/3 px-2 text-2xl">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif, image/HEIC"
          {...register("image", { required: !post })}
        />

        {/* Image preview (new upload) */}
        {imagePreview?.[0] && (
          <img
            src={URL.createObjectURL(imagePreview[0])}
            alt="Preview"
            className="mb-4 rounded-lg"
          />
        )}

        {/* Existing image (edit mode) */}
        {post?.featuredImage && !imagePreview?.[0] && (
          <img
            src={service.getPreview(post.featuredImage)}
            alt={post.title}
            className="mb-4 rounded-lg"
          />
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}
