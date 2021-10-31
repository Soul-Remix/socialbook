import { URL } from '../config/url';

const fetchUsers = async (token: string, logOut: () => void) => {
  const res = await fetch(`${URL}users`, {
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
  return data;
};

export default fetchUsers;
