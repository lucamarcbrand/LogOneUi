import {
  GetRequest,
  DownloadImageGetRequest,
  PostRequest,
  PutRequest,
} from "./BaseService";
// USER SERVICE API'S
const DOWNLOAD_USER_PROFILE_PIC = "users/downloadUserProfilePic/";
const GET_USER_DETAIL = "users/getUserDetail/";
const CREATE_USER = "users/createUser";
const UPDATE_USER_PROFILE = "users/updateUserDetail";

// default header send in each API request
const defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
  accept: "application/json",
};

// function to make API call: get user profile information
export const getUserDetailByUserIdAPI = (userId, headers) => {
  return GetRequest(`${GET_USER_DETAIL}${userId}`, headers);
};

export const downloadUserProfilePicAPI = (userId, headers) => {
  return DownloadImageGetRequest(
    `${DOWNLOAD_USER_PROFILE_PIC}${userId}`,
    headers
  );
};
// function to make API call: create new user request
export const createUserAPI = (data) => {
  const _header = defaultHeaders;
  _header["Content-Type"] = "application/json";
  return PostRequest(`${CREATE_USER}`, _header, data);
};
// function to make API call: update existing user profile information
export const updateUserDetailService = (defaultHeaders, data) => {
  data["changePassword"] = data.password.length > 0 ? true : false;
  return PutRequest(UPDATE_USER_PROFILE, defaultHeaders, data);
};
