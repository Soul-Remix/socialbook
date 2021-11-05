const fetchUser = async (
  token: string,
  id: number,
  logOut: any,
  history: any
) => {
  const res = await fetch(`${process.env.REACT_APP_URI}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (res.status === 401) {
    logOut();
  }
  if (res.status === 404) {
    history.push('/404');
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchUser;
