const getSellercloudTokenData = async (token) => {
  try {
    const sellerCloudResponse = await fetch(
      'http://192.168.88.2:8082/api/auth/sc_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      }
    );
    const sellercloudData = await sellerCloudResponse.json();

    return sellercloudData;
  } catch (err) {
    throw err;
  }
};

const refreshToken = async () => {
  try {
    const body = { user: JSON.parse(localStorage.getItem('userData')) };

    console.log(console.log(body));

    const response = await fetch('http://192.168.88.2:8082/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    localStorage.setItem('token', JSON.stringify(data.token));

    return data.token;
  } catch (err) {
      console.log('ERROR' + JSON.stringify(err.message, null, 4));
    return err;
  }
};

const getAllProducts = async () => {
  const response = await fetch('http://192.168.88.2:8082/api/products/catalog');
  const data = await response.json();

  return data;
};

export { getSellercloudTokenData, getAllProducts, refreshToken };
