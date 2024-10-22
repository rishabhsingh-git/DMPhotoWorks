import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_CONSTANTS } from "../../common/constant";
import { uploadAssets, clearUploadStatus } from "../../store/assetsReducer";
import { Toaster, UploadLoader } from "../../shared/index";

const ManageAssets = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isToastVisible, setShowToaster] = useState(false);
  const [toasterMessage, setShowToasterMesssage] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, uploadStatus, isError } = useSelector(
    (state) => state.assets
  );

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setImagePreview("");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file && category && title) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("title", title);
      dispatch(uploadAssets(formData));
      handleReset();
    }
  };

  const handleReset = () => {
    setFile(null);
    setCategory("");
    setTitle("");
    setImagePreview("");
    document.getElementById("user_avatar").value = "";
  };

  useEffect(() => {
    if (isError || isSuccess) {
      setShowToaster(true);
      setShowToasterMesssage(uploadStatus);
    }
  }, [isError, isSuccess]);

  const handleToasterClose = () => {
    setShowToaster(false);
    setShowToasterMesssage("");
    dispatch(clearUploadStatus(""));
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Manage Assets
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="user_avatar"
            >
              Upload File
            </label>
            <input
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              required
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-52 rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-white mb-2"
            >
              Select Category
            </label>
            <select
              onChange={handleCategoryChange}
              value={category}
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORY_CONSTANTS.map((element, index) => (
                <option key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="small-input"
              className="block text-sm font-medium text-white mb-2"
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the title"
            />
          </div>

          <div className="flex gap-4">
            {isLoading ? (
              <UploadLoader />
            ) : (
              <button
                type="submit"
                disabled={!file || !category || !title}
                className={`flex-1 text-white ${
                  !file
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Submit
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset
            </button>
          </div>
        </form>
        {isToastVisible ? (
          <Toaster
            isSuccess={isSuccess}
            isFailure={isError}
            message={toasterMessage}
            onClose={handleToasterClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ManageAssets;
