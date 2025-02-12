export default () => {
  const getAsync = async (url: string, token?: string | undefined) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  };

  const postAsync = async (url: string, body: any, token?: string) => {
    const response = await fetch(url, {
      'method': 'POST',
      'headers': {
        'x-rapidapi-host': 'fairestdb.p.rapidapi.com',
        'x-rapideapi-key': 'apikey',
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      'body': JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };

  const putAsync = async (url: string, body: any, token?: string) => {
    const response = await fetch(url, {
      'method': 'PUT',
      'headers': {
        'x-rapidapi-host': 'fairestdb.p.rapidapi.com',
        'x-rapidapi-key': 'apikey',
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      'body': JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };

  const deleteAsync = async (url: string) => {
    const response = await fetch(url, {
      'method': 'DELETE',
      'headers': {
        'x-rapidapi-host': 'fairestdb.p.rapidapi.com',
        'x-rapidapi-key': 'apikey',
      },
    });
    const data = await response.json();
    return data;
  };

  return {
    getAsync,
    postAsync,
    putAsync,
    deleteAsync,
  };
};
