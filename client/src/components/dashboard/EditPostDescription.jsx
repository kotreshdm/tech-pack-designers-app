import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Banner, Button } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
//Api config
import { editPostDescriptionAPI } from "./apiConfig/postAPIConfig";
//const import

import MyBucket from "../../utils/MyBucket";
import Constants from "../../utils/Constants";
//css import
import "./MyTableStyles.css";
Quill.register("modules/imageResize", ImageResize);
const EditPostDescription = ({ selectedData, backToPost, refreshAfterAdd }) => {
  const quillRef = useRef(null);
  useEffect(() => {
    if (selectedData.postDescription) {
      if (quillRef.current) {
        quillRef.current.getEditor().root.innerHTML =
          selectedData.postDescription;
      }
    }
  }, [selectedData.postDescription]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      postId: selectedData._id,
      postDescription: quillRef.current.value.replace("<br>", "<br/>"),
    };

    if (quillRef.current.value === null || quillRef.current.value === "null") {
      toast.error("Post description changes made");
      return;
    }
    await editPostDescriptionAPI({ data }).then((response) => {
      if (response.status === 200) {
        refreshAfterAdd();
        toast.success(`${selectedData.postName} Updated`);
        backToPost();
      } else {
        toast.error(response.message);
      }
    });
  };
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      var file = input && input.files ? input.files[0] : null;
      const fileName = new Date().getTime() + file.name;
      const params = {
        ACL: "public-read",
        Body: file,
        Key: `PostImage/${selectedData._id.toString()}/${fileName}`,
      };
      await MyBucket.putObject(params).promise();
      let data = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
      let quillObj = quillRef.current.getEditor();
      const range = quillObj.getSelection();
      quillObj.editor.insertEmbed(range.index, "image", data);
    };
  };

  const modules = {
    toolbar: {
      container: [
        [
          {
            header: [1, 2, 3, 4, 5, 6, false],
          },
        ],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          {
            align: [],
          },
        ],
        [
          {
            color: [],
          },
          {
            background: [],
          },
        ],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
          {
            indent: "-1",
          },
          {
            indent: "+1",
          },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];
  const handleChange = (value) => {
    // console.log("quillRef value:", quillRef.current.value);
  };
  return (
    <div className='container mx-auto'>
      <div className='table-header'>
        <Banner className='mb-5 mt-5'>
          <div className='flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700'>
            <div className='mx-auto flex items-center'>
              <p className='flex items-center text-sm font-normal text-gray-800 dark:text-gray-800'>
                Post Title :&nbsp;<span>{selectedData.postName}</span>
              </p>
            </div>
          </div>
        </Banner>
        <form className='gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 mt-5 mb-20'>
            <ReactQuill
              ref={quillRef}
              defaultValue={selectedData.postDescription}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              tag='textarea'
              theme='snow'
              style={{
                height: "400px",
                width: "1000px",
                marginBottom: "30px",
                margin: "auto",
              }}
            />
          </div>

          <div className='grid grid-cols-6 gap-1 mt-8'>
            <div className='col-span-3 flex justify-start'>
              <Button onClick={backToPost}>All Post</Button>
            </div>
            <div className='col-span-3 flex justify-end'>
              <Button type='submit' color='purple'>
                Update Description
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostDescription;
