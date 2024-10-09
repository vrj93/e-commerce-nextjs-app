const handleProductPage = (router: any, productId: any) => {
  const encodedId = Buffer.from(productId.toString()).toString("base64");
  router.push(`/product/${encodedId}`);
};

export default handleProductPage;