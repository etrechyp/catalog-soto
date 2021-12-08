const getSellercloudTokenData = async (userJWT) => {
  try {
    const sellerCloudResponse = await fetch(
      'http://192.168.88.2:8082/api/auth/sc_token',
      {
        method: 'POST',
        headers: {
          token: userJWT,
        },
      }
    );
    const sellercloudData = await sellerCloudResponse.json();
    if(sellercloudData.ok) {
        delete sellercloudData.ok;
        return sellercloudData;
    }
  } catch (err) {
      throw err;
  }
};

export default getSellercloudTokenData;
