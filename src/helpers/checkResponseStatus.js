export const checkResponseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
};
