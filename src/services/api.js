import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // ✅ đúng
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Lấy tất cả bài viết
export const getPosts = async () => {
  const res = await api.get('/posts');
  return res.data;
};

// ✅ Lấy 1 bài viết theo ID
export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// ✅ Thêm bài viết mới
export const createPost = async (postData) => {
  const res = await api.post('/posts', postData);
  return res.data;
};

// ✅ Cập nhật
export const updatePost = async (id, updatedData) => {
  const res = await api.put(`/posts/${id}`, updatedData);
  return res.data;
};

// ✅ Xóa
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
