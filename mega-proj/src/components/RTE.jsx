import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from 'react-hook-form'
function RTE({name, label, defaultValue="", control}) {
    return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-2'>{label}</label>}
        <Controller
        name={name || "content"}
        defaultValue={defaultValue}
        control={control}
        render={({field:{onChange}})=>(
            <Editor
            apiKey='ibu69jfiz6uaiuf1y2060rizlxx8pvlnme9e85ulch5ueqth'
            initialValue={defaultValue}
            //init ke andar key:value me dena hota hai
            init={{
            initialValue: defaultValue,
            height: 800,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            
        }}
        onEditorChange={onChange}
            />
        )}/>
    </div>
    )
}

export default RTE