import Axios from "axios";

const DEV_BACKEND_SERVER = "http://localhost:8080";

export const GetRequest = (url, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "get",
      url: `${DEV_BACKEND_SERVER}/${url}`,
      data: "",
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const PostRequest = (url, headers, data) => {
  headers["Accept"] = "application/json";

  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: `${DEV_BACKEND_SERVER}/${url}`,
      data: JSON.stringify(data),
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const PostRequestFormData = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "post",
      url: `${DEV_BACKEND_SERVER}/${url}`,
      data: data,
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const PutRequest = (url, headers, data) => {
  headers["Accept"] = "application/json";

  return new Promise((resolve, reject) => {
    Axios({
      method: "put",
      url: `${DEV_BACKEND_SERVER}/${url}`,
      data: JSON.stringify(data),
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const DownloadImageGetRequest = (url, headers) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: "get",
      url: `${DEV_BACKEND_SERVER}/${url}`,
      headers,
      data: "",
      responseType: "blob",
    })
      .then((response) => {
        if (response.status === 204) {
          return undefined;
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
