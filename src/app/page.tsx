import ByCategory from "@/app/product/dashboard/byCategory";
import ByBrand from "@/app/product/dashboard/byBrand";

const Page = () => {
  return (
    <>
      <div>
        <ByCategory />
        <ByBrand />
      </div>
    </>
  );
};

export default Page;
