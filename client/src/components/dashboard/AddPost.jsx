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
    if (file) {
      setBannerImage(file);
      setBannerImageUrl(URL.createObjectURL(file));
    }
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
    }

    let url = ApiConstants.post.create;
    let method = "POST";
    if (selectedData.postId > -1) {
      url = ApiConstants.post.update;
      method = "PUT";
      data.postId = selectedData.postId;
    }
    if (bannerImage) {
      const params = {
        ACL: "public-read",
        Body: bannerImage,
        Key: `PostImage/${selectedData.postId
          .toString()
          .padStart(5, "0")}/bannerImage`,
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
          .padStart(6, "0")}/socialImage`,
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
          `${formData.postName || selectedData.postName} is post is Created`
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
              <TextInput
                type='text'
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
              />
            </div>
            <div className=' mt-3'>
              <label value={-1}>Select category</label>
              <Select
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                  })
                }
                value={selectedData.categoryId}
              >
                <option value='uncategorized'>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className=' mt-3'>
              <label>Page Title</label>
              <TextInput
                type='text'
                placeholder='Page Title'
                id='SEOTitle'
                defaultValue={selectedData.SEOTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    SEOTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className='mt-3'>
              <label>SEO Description</label>
              <TextInput
                type='text'
                placeholder='SEO Description'
                id='SEODescription'
                defaultValue={selectedData.SEODescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    SEODescription: e.target.value,
                  })
                }
              />
            </div>
            <div className='mt-3'>
              <label>SEO Keywords</label>
              <TextInput
                type='text'
                placeholder='SEO Keywords'
                id='SEOKeywords'
                defaultValue={selectedData.SEOKeywords}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    SEOKeywords: e.target.value,
                  })
                }
              />
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
                value={selectedData.status}
              >
                <option value=''>Select a Post Status</option>
                <option value='Draft'>Draft</option>
                <option value='Published'>Published</option>
              </Select>
            </div>
          </div>
          {selectedData.postId ? (
            <div className='grid grid-cols-4 gap-4'>
              <div className=' mt-3'>
                <label>Post Banner</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleBanerImageChange}
                  ref={filePickerBanner}
                  hidden
                />
                <div
                  className='relative h-48 self-center cursor-pointer overflow-hidden'
                  onClick={() => filePickerBanner.current.click()}
                >
                  <img
                    src={
                      bannerImageUrl ||
                      selectedData.bannerImage ||
                      "https://placehold.co/300x200"
                    }
                    alt='user'
                    className={`m-auto h-full object-cover border-4 border-[lightgray] ${
                      bannerUploadProgress &&
                      bannerUploadProgress < 100 &&
                      "opacity-60"
                    }`}
                  />
                </div>
              </div>
              <div className='mt-3'>
                <label>Post SocialMedia Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleSocialImageChange}
                  ref={filePickerSocialMedia}
                  hidden
                />
                <div
                  className='relative h-48 self-center cursor-pointer overflow-hidden'
                  onClick={() => filePickerSocialMedia.current.click()}
                >
                  <img
                    src={
                      socialImageUrl ||
                      selectedData.socialImage ||
                      "https://placehold.co/300x200"
                    }
                    alt='user'
                    className={`m-auto h-full object-cover border-4 border-[lightgray] ${
                      socialUploadProgress &&
                      socialUploadProgress < 100 &&
                      "opacity-60"
                    }`}
                  />
                </div>
              </div>
            </div>
          ) : null}
          <div className='grid grid-cols-6 gap-1 mt-8'>
            <div className='col-span-3 flex justify-start'>
              <Button onClick={backToPost}>All Post</Button>
            </div>
            <div className='col-span-3 flex justify-end'>
              <Button type='submit' color='purple' disabled={loading}>
                {selectedData?.categoryId > -1
                  ? "Update Post"
                  : "Create New Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
