const fetchPost = async (token: string, id: string, logOut: () => void) => {
  const res = await fetch(`${process.env.REACT_APP_URI}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 401) {
    logOut();
    return;
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchPost;
