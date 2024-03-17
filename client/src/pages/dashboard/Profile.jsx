import { Alert, Button, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import MyBucket from "../../utils/MyBucket";
import Constants from "../../utils/Constants";
import { updateProfileAPI } from "../../components/dashboard/apiConfig/Profile";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    setImageFileUploadError(null);
    let uploadData = { ...formData };
    try {
      if (imageFile) {
        const params = {
          ACL: "public-read",
          Body: imageFile,
          Key: `profilePic/user-${currentUser.userId}`,
        };
        const result = await MyBucket.putObject(params)
          .on("httpUploadProgress", (evt) => {
            return setImageFileUploadProgress(
              Math.round((evt.loaded / evt.total) * 100)
            );
          })
          .promise();
        const downloadURL = `https://${Constants.S3.S3_BUCKET}.s3.${Constants.S3.REGION}.amazonaws.com/${params.Key}`;
        uploadData.profileImg = downloadURL;
      }
      if (Object.keys(uploadData).length === 0) {
        dispatch(signInFailure("No changes made"));
        return;
      }
      dispatch(updateStart());
      await updateProfileAPI({
        data: uploadData,
        userId: currentUser.userId,
      }).then((response) => {
        if (response.status === 200) {
          dispatch(updateSuccess(response.data));
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploadProgress(null);
          setUpdateUserSuccess("User's profile updated successfully");
        } else {
          dispatch(updateFailure(response.message));
        }
      });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className='max-w-lg p-3 w-full m-auto'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
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
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='userName'
          placeholder='userName'
          defaultValue={currentUser.userName}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          readOnly
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>

      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
    </div>
  );
}
