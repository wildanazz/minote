import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_baseAPIURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export const init = () => {
  return axiosInstance.post("/init").then((user) => {
    return user.data;
  });
};

export const signIn = (email, password) => {
  return axiosInstance
    .post("/login", {
      email,
      password,
    })
    .then((user) => {
      return user.data;
    });
};

export const signOut = () => {
  return axiosInstance
    .post(`${process.env.REACT_APP_baseAPIURL}/logout`)
    .then((user) => {
      return user.data;
    });
};

export const signUp = (name, email, password) => {
  return axiosInstance
    .post("/signup", {
      name,
      email,
      password,
    })
    .then((user) => {
      return user.data;
    });
};

export const addNote = (title, description) => {
  return axiosInstance
    .post("/note/add", {
      title,
      description,
    })
    .then((note) => {
      return note.data;
    });
};

export const listNote = () => {
  return axiosInstance.post("/note/list").then((notes) => {
    return notes.data;
  });
};

export const updateNote = (_id, important = null, done = null) => {
  const fieldsToUpdate = {
    _id,
  };

  if (important !== null) {
    fieldsToUpdate.important = important;
  }
  if (done !== null) {
    fieldsToUpdate.done = done;
  }
  return axiosInstance.patch("/note/update", fieldsToUpdate).then((note) => {
    return note.data;
  });
};

export const deleteNote = (_id) => {
  return axiosInstance
    .delete("/note/delete", {
      data: {
        _id,
      },
    })
    .then((note) => {
      return note;
    });
};
