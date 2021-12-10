import { useState, useEffect } from 'react';

const useProductImages = (productId, defaultImage) => {
  const [images, setImages] = useState({
    loading: true,
    data: null,
    selectedImage: null,
  });

  const getImagesForProduct = async (productId, defaultImage) => {
    const sellerCloudToken =
      'Bearer ' +
      JSON.parse(localStorage.getItem('sellerCloudDataToken')).access_token;
    const promiseResponse = await fetch(
      `https://cf.api.sellercloud.com/rest/api/ProductImage?productID=${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sellerCloudToken,
        },
      }
    );
    const imagesData = await promiseResponse.json();

    setImages({
      loading: false,
      data: imagesData,
      selectedImage: defaultImage,
    });
  };

  const changeSelectedImage = (index) => {
    setImages((prevState) => ({
      ...prevState,
      selectedImage: images.data[index].Url,
    }));
  };

  useEffect(() => {
    getImagesForProduct(productId, defaultImage);

    return () => {
      setImages({
        loading: true,
        data: null,
        selectedImage: null,
      });
    };
  }, [productId]);

  return {
    images,
    changeSelectedImage
  }
};

export default useProductImages;