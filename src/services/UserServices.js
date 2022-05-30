import {
  GetRequest,
  DownloadImageGetRequest,
  PostRequest,
  PutRequest,
} from "./BaseService";

const DOWNLOAD_USER_PROFILE_PIC = "users/downloadUserProfilePic/";
const GET_USER_DETAIL = "users/getUserDetail/";
const CREATE_USER = "users/createUser";
const UPDATE_USER_PROFILE = "users/updateUserDetail";
const defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
  accept: "application/json",
};

export const getUserDetailByUserIdAPI = (userId, headers) => {
  return GetRequest(`${GET_USER_DETAIL}${userId}`, headers);
};
export const downloadUserProfilePicAPI = (userId, headers) => {
  return DownloadImageGetRequest(
    `${DOWNLOAD_USER_PROFILE_PIC}${userId}`,
    headers
  );
};
export const createUserAPI = (data) => {
  const _header = defaultHeaders;
  _header["Content-Type"] = "application/json";
  return PostRequest(`${CREATE_USER}`, _header, data);
};

export const updateUserDetailService = (defaultHeaders, data) => {
  data["changePassword"] = data.password.length > 0 ? true : false;
  return PutRequest(UPDATE_USER_PROFILE, defaultHeaders, data);
};
