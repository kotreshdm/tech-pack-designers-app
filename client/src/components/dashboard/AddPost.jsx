import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Banner, Button, Select, TextInput } from "flowbite-react";
//import context
import { useDashboardContext } from "../../context/DashboardContext";
//config function
import { addPostAPI } from "./apiConfig/postAPIConfig";
import { getAllCategoriesAPI } from "./apiConfig/categoriesAPIConfig";
//const import
import ApiConstants from "../../serviceIntegration/ApiConstants";
import MyBucket from "../../utils/MyBucket";
import Constants from "../../utils/Constants";
//css import
import "./MyTableStyles.css";

const AddPost = ({ selectedData, backToPost, refreshAfterAdd }) => {
  const { allCategories } = useDashboardContext();
  const [categories, setCategories] = allCategories;

  const filePickerBanner = useRef();
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(null);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(null);

  const filePickerSocialMedia = useRef();
  const [socialImage, setSocialImage] = useState(null);
  const [socialImageUrl, setSocialImageUrl] = useState(null);
  const [socialUploadProgress, setSocialUploadProgress] = useState(null);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
  }, []);

  const getAllCategories = async () => {
    setLoading(true);
    await getAllCategoriesAPI().then((response) => {
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        toast.error(response.message);
      }
    });
    setLoading(false);
  };
  const handleBanerImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a new Image object
    const img = new Image();

    // Set up onload event handler
    img.onload = function () {
      const width = this.width;
      const height = this.height;

      console.log(width, height);

      // Check if dimensions are correct
      if (width !== 350 || height !== 200) {
        toast.error("Image size should be 350 X 200");
        return;
      }

      // Dimensions are correct, proceed with setting banner image
      setBannerImage(file);
      setBannerImageUrl(URL.createObjectURL(file));
    };

    // Set up onerror event handler
    img.onerror = function () {
      toast.error("Failed to load image");
    };

    // Set the src of the Image object to the selected file
    img.src = URL.createObjectURL(file);
  };
  const handleSocialImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSocialImage(file);
      setSocialImageUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      ...formData,
    };
    if (formData.postName) {
      data.postSlug = formData.postName
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
      if (data.postSlug.length > 75) {
        toast.error({ title: "Post title should be less then 75 Char" });
        return;
      }
    }

    let url = ApiConstants.post.create;
    let method = "POST";
    if (selectedData._id) {
      url = ApiConstants.post.update;
      method = "PUT";
      data.postId = selectedData._id;
    }
    if (bannerImage) {
      const params = {
        ACL: "public-read",
        Body: bannerImage,
        Key: `PostImage/${selectedData._id.toString()}/bannerImage`,
      };
      const result = await MyBucket.putObject(params)
        .on("httpUploadProgress", (evt) => {
          return setBannerUploadProgress(
            Math.round((evt.loaded / evt.total) * 100)
          );
        })
        .promise();

      const downloadURL = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
      data.bannerImage = downloadURL;
    }
    if (socialImage) {
      const params = {
        ACL: "public-read",
        Body: socialImage,
        Key: `PostImage/${selectedData.postId
          .toString()
          .padStart(5, "0")}/socialImage`,
      };
      const result = await MyBucket.putObject(params)
        .on("httpUploadProgress", (evt) => {
          return setSocialUploadProgress(
            Math.round((evt.loaded / evt.total) * 100)
          );
        })
        .promise();

      const downloadURL = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
      data.socialImage = downloadURL;
    }
    if (Object.keys(data).length === 0) {
      toast.error("No changes made");
      return;
    }
    await addPostAPI({ data, url, method }).then((response) => {
      if (response.status === 200) {
        refreshAfterAdd();
        toast.success(
          `${formData.postName || selectedData.postName} is post is ${
            selectedData._id ? "Updated " : "Created"
          }`
        );
        backToPost();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='table-header'>
        <Banner className='mb-5 mt-5'>
          <div className='flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700'>
            <div className='mx-auto flex items-center'>
              <p className='flex items-center text-sm font-normal text-gray-500 dark:text-gray-400'>
                Add /Edit Post
              </p>
            </div>
          </div>
        </Banner>
        <form className='gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-3 gap-4'>
            <div className=' mt-3'>
              <label>Post Title</label>
              <textarea
                placeholder='Title'
                required
                id='postName'
                defaultValue={selectedData.postName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    postName: e.target.value,
                  })
                }
                rows='4'
                class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
            </div>

            <div className='mt-3'>
              <label>Description</label>
              <textarea
                id='SEODescription'
                defaultValue={selectedData.SEODescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    SEODescription: e.target.value,
                  })
                }
                rows='4'
                class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='SEO Description'></textarea>
            </div>

            <div className='mt-3'>
              <label>SEO Keywords</label>
              <textarea
                placeholder='SEO Keywords'
                id='SEOKeywords'
                defaultValue={selectedData.SEOKeywords}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    SEOKeywords: e.target.value,
                  })
                }
                rows='4'
                class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
            </div>
            <div className=' mt-3'>
              <label value={-1}>Select category</label>
              <Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                  });
                }}
                value={formData.categoryId || selectedData.categoryId}>
                <option value='uncategorized'>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className='mt-3'>
              <label>Post Status</label>
              <Select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                value={formData.status || selectedData.status}>
                <option value=''>Select a Post Status</option>
                <option value='Draft'>Draft</option>
                <option value='Published'>Published</option>
              </Select>
            </div>
            <div className='mt-3'>
              {selectedData._id ? (
                <>
                  {" "}
                  <label>Post Banner</label>{" "}
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleBanerImageChange}
                    ref={filePickerBanner}
                    hidden
                  />
                  <div
                    className='relative h-48 self-center cursor-pointer overflow-hidden'
                    onClick={() => filePickerBanner.current.click()}>
                    <img
                      src={
                        bannerImageUrl ||
                        selectedData.bannerImage ||
                        "https://placehold.co/350x200"
                      }
                      alt='user'
                      className={`m-auto h-full object-cover border-4 border-[lightgray] ${
                        bannerUploadProgress &&
                        bannerUploadProgress < 100 &&
                        "opacity-60"
                      }`}
                    />
                  </div>{" "}
                </>
              ) : null}
            </div>
          </div>

          <div className='grid grid-cols-6 gap-1 mt-8'>
            <div className='col-span-3 flex justify-start'>
              <Button onClick={backToPost}>All Post</Button>
            </div>
            <div className='col-span-3 flex justify-end'>
              <Button type='submit' color='purple' disabled={loading}>
                {selectedData._id ? "Update Post" : "Create New Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
