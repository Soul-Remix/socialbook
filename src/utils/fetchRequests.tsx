const fetchRequests = async (
  id: number,
  token: string,
  logOut: () => void,
  type: string
) => {
  const res = await fetch(
    `${process.env.REACT_APP_URI}/friends/${id}/${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (res.status === 401) {
    logOut();
    throw new Error(data.message);
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchRequests;
