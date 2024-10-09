import CartBuy from "./cartBuy";
import ProductAbout from "./productAbout";
import ProductBrandCatMnf from "./productBrandCatMnf";
import ProductColors from "./productColors";
import ProductPrice from "./productPrice";
import ProductTitle from "./productTitle";

const ProductInfo = ({
  product,
  selectedColorId,
  setSelectedColorId,
  productQuantity,
  setProductQuantity,
}: any) => {
  return (
    <div className="w-full md:w-2/3 flex flex-col md:flex-row">
      <div className="w-full md:w-2/3">
        <ProductTitle product={product} />
        <ProductPrice price={product.price} />
        {/* Product Details */}
        <div className="w-full my-4 py-2">
          {product?.colors && (
            <ProductColors
              colors={product?.colors}
              selectedColorId={selectedColorId}
              setSelectedColorId={setSelectedColorId}
            />
          )}
          <ProductBrandCatMnf product={product} />
          {product?.description && (
            <ProductAbout description={product?.description} />
          )}
        </div>
      </div>
      <CartBuy
        product={product}
        productQuantity={productQuantity}
        setProductQuantity={setProductQuantity}
      />
    </div>
  );
};

export default ProductInfo;
