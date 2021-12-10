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
  let token = 'Bearer ';
  token += JSON.parse(
    localStorage.getItem('sellerCloudDataToken')
  ).access_token;

  const getTotalNumberOfProducts = async (token) => {
    try {
      const response = await fetch(
        `https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=1&pageSize=1`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      return data.TotalResults;
    } catch (err) {
      return err;
    }
  };

  const getCatalog = async (token, numberOfProducts) => {
    const promises = [];
    const innerPromises = [];
    const catalog = [];

    for (let i = 1; i <= Math.ceil(numberOfProducts / 50); i++) {
      promises.push(
        fetch(
          `https://cf.api.sellercloud.com/rest/api/Catalog/GetAllByView?viewID=32&pageNumber=${i}&pageSize=50`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        )
      );
    }

    const promisesResponses = await Promise.all(promises);

    for (let promise of promisesResponses) {
      innerPromises.push(promise.json());
    }

    const productPages = await Promise.all(innerPromises);

    for (let page of productPages) {
      catalog = [...catalog, ...page.Items];
    }

    return catalog;
  };

  const numberOfProducts = await getTotalNumberOfProducts(token);
  const catalog = await getCatalog(token, numberOfProducts);

  return catalog;
};

export { getSellercloudTokenData, getAllProducts };
