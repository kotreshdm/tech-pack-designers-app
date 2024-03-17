import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";
import ReactQuill from "react-quill";
import { Button, Modal, TextInput } from "flowbite-react";
import { addEditCategoryAPI } from "./apiConfig/categoriesAPIConfig";
import ApiConstants from "../../serviceIntegration/ApiConstants";
import MyBucket from "../../utils/MyBucket";
import Constants from "../../utils/Constants";
const AddCategoryModel = ({
  closeDialog,
  refreshAfterSuccess,
  selectedData,
}) => {
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const [loading, setLoading] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    let data = { ...formData };
    if (formData.name) {
      data.slug = formData.name
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    }

    try {
      if (imageFile) {
        const params = {
          ACL: "public-read",
          Body: imageFile,
          Key: `categories/${data.slug}`,
        };
        const result = await MyBucket.putObject(params)
          .on("httpUploadProgress", (evt) => {
            return setImageFileUploadProgress(
              Math.round((evt.loaded / evt.total) * 100)
            );
          })
          .promise();

        const downloadURL = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
        data.catBanner = downloadURL;
      }
      if (Object.keys(data).length === 0) {
        toast.error("No changes made");
        return;
      }

      let url = ApiConstants.category.create;
      let method = "POST";
      if (selectedData.categoryId > -1) {
        url = ApiConstants.category.update;
        method = "PUT";
        data.categoryId = selectedData.categoryId;
      }
      await addEditCategoryAPI({
        data,
        url,
        method,
      }).then((response) => {
        if (response.status === 200) {
          toast.success(
            `${formData.name || selectedData.name} is Categotry Updated`
          );
          refreshAfterSuccess();
          closeDialog();
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploadProgress(null);
        } else {
          toast.error(response.message);
        }
      });
      setLoading(false);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <Modal.Header className='m-2 text-lg text-gray-500 dark:text-gray-400'>
        {selectedData.categoryId ? "Edit" : "Add"} Category
      </Modal.Header>
      <Modal.Body>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='name'
              className='flex-1'
              defaultValue={selectedData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className='relative h-32 self-center cursor-pointer shadow-md overflow-hidden'
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={
                imageFileUrl ||
                selectedData.catBanner ||
                "https://placehold.co/600x400"
              }
              alt='user'
              className={` w-full h-full object-cover border-4 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          <div>
            <ReactQuill
              theme='snow'
              placeholder='Category description...'
              className='h-40 mb-12'
              defaultValue={selectedData.description}
              onChange={(value) => {
                setFormData({ ...formData, description: value });
              }}
            />
          </div>
          <div className={`grid grid-cols-2 gap-1`}>
            <Button onClick={closeDialog}>Close</Button>
            <Button type='submit' color='purple' disabled={loading}>
              {selectedData?.categoryId > -1
                ? "Update Category"
                : "Create New Category"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default AddCategoryModel;
