import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

import ImageResize from "quill-image-resize-module-react";
import MyBucket from "../../utils/MyBucket";
import Constants from "../../utils/Constants";
Quill.register("modules/imageResize", ImageResize);

function QuillEditor(props) {
  const quillRef = useRef(null);
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().root.innerHTML = props.content;
    }
  }, [props.content]);
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      var file = input && input.files ? input.files[0] : null;
      const params = {
        ACL: "public-read",
        Body: file,
        Key: `PostImage/post-123433`,
      };
      await MyBucket.putObject(params).promise();
      let data = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
      let quillObj = quillRef.current.getEditor();
      const range = quillObj.getSelection();
      console.log(range);
      quillObj.editor.insertEmbed(range.index, "image", data);
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
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
    // if (quillRef.current) {
    //   console.log("quillRef value:", quillRef.current.value);
    // } else {
    //   console.error("quillRef is null");
    // }
  };
  return (
    <>
      <ReactQuill
        ref={quillRef}
        defaultValue={props.content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        tag='textarea'
        theme='snow'
        style={{
          height: "300px",
          maxWidth: "800px",
        }}
      />
    </>
  );
}

export default QuillEditor;
