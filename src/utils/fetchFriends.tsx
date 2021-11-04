const fetchFriends = async (token: string, id: number, logOut: any) => {
  const res = await fetch(`${process.env.REACT_APP_URI}/friends/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 401) {
    logOut();
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchFriends;
