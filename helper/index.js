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

const getAllProducts = async () => {
  const response = await fetch('http://192.168.88.2:8082/api/products/catalog');
  const data = await response.json();

  return data.catalog;
};

export { getSellercloudTokenData, getAllProducts };
