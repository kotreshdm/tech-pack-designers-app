import { Banner, Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "./MyTableStyles.css";
import { useDashboardContext } from "../../context/DashboardContext";
import { getAllCategoriesAPI } from "./apiConfig/categoriesAPIConfig";
import ApiConstants from "../../serviceIntegration/ApiConstants";
import { addPostAPI } from "./apiConfig/postAPIConfig";
import { toast } from "react-toastify";

const AddPost = ({ selectedData, backToPost, refreshAfterAdd }) => {
  console.log(selectedData);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(null);
  const { allCategories } = useDashboardContext();
  const [categories, setCategories] = allCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);
    let data = { ...formData };
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
    if (Object.keys(data).length === 0) {
      toast.error("No changes made");
      return;
    }
    await addPostAPI({
      data,
      url,
      method,
    }).then((response) => {
      if (response.status === 200) {
        refreshAfterAdd();
        toast.success(`${formData.postName} is post is Created`);
        backToPost();
      } else {
        toast.error(response.message);
      }
    });
    setLoading(false);
  };

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
  return (
    <div className='container mx-auto'>
      <div className='table-header'>
        <Banner className='mb-5 mt-5'>
          <div className='flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700'>
            <div className='mx-auto flex items-center'>
              <p className='flex items-center text-sm font-normal text-gray-500 dark:text-gray-400'>
                Add New Post
              </p>
            </div>
          </div>
        </Banner>
        <form className='gap-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div className=' mt-3'>
              <label>Post Title</label>
              <TextInput
                type='text'
                placeholder='Title'
                required
                id='postName'
                defaultValue={selectedData.postName}
                onChange={(e) =>
                  setFormData({ ...formData, postName: e.target.value })
                }
              />
            </div>
            <div className=' mt-3'>
              <label value={-1}>Select category</label>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
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
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className=' mt-3'>
              <label>SEO Description</label>
              <TextInput
                type='text'
                placeholder='SEO Description'
                id='SEODescription'
                defaultValue={selectedData.SEODescription}
                onChange={(e) =>
                  setFormData({ ...formData, SEODescription: e.target.value })
                }
              />
            </div>
            <div className=' mt-3'>
              <label>SEO Title</label>
              <TextInput
                type='text'
                placeholder='SEO Title'
                id='SEOTitle'
                defaultValue={selectedData.SEOTitle}
                onChange={(e) =>
                  setFormData({ ...formData, SEOTitle: e.target.value })
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
                  setFormData({ ...formData, SEOKeywords: e.target.value })
                }
              />
            </div>
          </div>

          <div className='grid grid-cols-6 gap-1 mt-8'>
            <div className='col-span-3 flex justify-start'>
              <Button onClick={backToPost}>All Post</Button>
            </div>
            <div className='col-span-3 flex justify-end'>
              <Button type='submit' color='purple' disabled={loading}>
                {selectedData?.categoryId > -1
                  ? "Update Category"
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
