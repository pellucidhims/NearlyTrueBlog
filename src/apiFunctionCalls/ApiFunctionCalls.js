import axios from "axios";
import { BASE_URL, BASE_URL_READ } from "../constants/Constants";

export function getSiteCategoriesAndTags(siteId) {
  let urlOptions = ["categories", "tags"];

  let requests = urlOptions.map(option =>
    axios.get(
      BASE_URL + siteId + `/${option}/?number=10&order_by=count&order=DESC`
    )
  );
  return new Promise((resolve, reject) => {
    Promise.all(requests)
      .then(responses => {
        resolve(responses);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getPosts(
  siteId,
  isoTimeStamp = undefined,
  loadByTag = undefined
) {
  let url;
  if (loadByTag) {
    url =
      BASE_URL_READ +
      `tags/${loadByTag}/posts/?number=25&order_by=date&order=DESC${
        isoTimeStamp ? "&before=" + isoTimeStamp : "/"
      }`;
  } else {
    url =
      BASE_URL +
      siteId +
      `/posts/?number=25&order_by=date&order=DESC${
        isoTimeStamp ? "&before=" + isoTimeStamp : "/"
      }`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getRelatedPosts(siteId, postId, postCount = 3) {
  let url = BASE_URL + `${siteId}/posts/${postId}/related`;
  return new Promise((resolve, reject) => {
    let dummyRealatedPosts = {
      total: 595,
      max_score: 593.7828,
      hits: [
        {
          _score: 593.7828,
          fields: {
            post_id: 592,
            blog_id: 107403796
          }
        },
        {
          _score: 553.29456,
          fields: {
            post_id: 6022,
            blog_id: 107403796
          }
        },
        {
          _score: 499.97388,
          fields: {
            post_id: 5541,
            blog_id: 107403796
          }
        }
      ]
    };
    // axios({
    //   method: "POST",
    //   url: url,
    //   headers: {
    //     "content-type":
    //       "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    //   },
    //   formData: { size: "3" }
    // })
    //As API is throwing 405 method not allowed, applying a hack with dummy data for representation.
    new Promise((resolve, reject) => {
      resolve(dummyRealatedPosts);
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getRelatedPostDetails(postsArray) {
  let requests = postsArray.map(option =>
    axios.get(BASE_URL + `${option.site_id}/posts/${option.post_id}`)
  );
  return new Promise((resolve, reject) => {
    Promise.all(requests)
      .then(responses => {
        resolve(responses);
      })
      .catch(err => {
        reject(err);
      });
  });
}
