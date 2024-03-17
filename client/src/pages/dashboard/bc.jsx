import React, { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

function TextEditor(props) {
  const quillRef = useRef(null);
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      var file = input && input.files ? input.files[0] : null;
      // var formData = new FormData();
      // formData.append("file", file);
      let quillObj = quillRef.current.getEditor();

      let data =
        "https://techpack-blog.s3.ap-south-1.amazonaws.com/profilePic/user-45";
      const range = quillObj.getSelection();
      quillObj.editor.insertEmbed(range.index, "image", data);
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
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
  const handleChange = (value) => {
    //  console.log(value);
    //  props.setContent(value);
    console.log("quillRef", quillRef.current.value);
  };
  return (
    <>
      {props.content}
      <ReactQuill
        ref={quillRef}
        value={props.content}
        onChange={handleChange}
        modules={modules}
        // formats={formats}
        tag='textarea'
        theme='snow'
        style={{
          height: "300px",
        }}
      />
    </>
  );
}

export default TextEditor;
