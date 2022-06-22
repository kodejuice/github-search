const HOST = "https://api.github.com";

const responseStatusTexts = {
  304: "Not modified",
  422: "Validation failed",
  503: "Service unavailable",
};

async function apiFetch(path) {
  const url = HOST + path;
  const res = await fetch(url, {
    mode: "cors",
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: `token ${process.env.REACT_APP_AUTH_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(
      res.statusText ||
        `Error ${res.status}: ${responseStatusTexts[res.status]}`
    );
  }
  return res.json();
}

export async function fetchUsers(query, page) {
  const pageLimit = 10;
  query = encodeURIComponent(query);
  const path = `/search/users?q=${query}&page=${page}&per_page=${pageLimit}`;

  const res = await apiFetch(path);
  if (res?.message && res?.errors) {
    throw new Error(res.message);
  }
  if (!res?.items) {
    throw new Error("Failed to fetch users");
  }

  return res;
}

export async function fetchUser(username) {
  username = encodeURIComponent(username);
  const path = `/users/${username}`;

  const res = await apiFetch(path);
  if (res?.message) {
    throw new Error(res.message);
  }
  if (!res?.login) {
    throw new Error("Failed to fetch user");
  }

  return res;
}
