import { Alert } from "flowbite-react";
import React from "react";

export const ImageUpload = () => {
  return (
    <div>
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
                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
              },
            }}
          />
        )}
        <img
          src={imageFileUrl || currentUser.profileImg}
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
    </div>
  );
};
