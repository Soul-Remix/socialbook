import { URL } from '../config/url';

const fetchConversations = async (
  token: string,
  id: number,
  logOut: () => void
) => {
  const res = await fetch(`${URL}conversations/user/${id}`, {
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

export default fetchConversations;
