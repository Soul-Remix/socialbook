import { URL } from '../config/url';

const fetchRequests = async (id: number, token: string, logOut: () => void) => {
  const res = await fetch(`${URL}friends/${id}/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status === 401) {
    logOut();
    throw new Error(data.message);
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(data.message);
  }
  console.log(data);
  return data;
};

export default fetchRequests;
