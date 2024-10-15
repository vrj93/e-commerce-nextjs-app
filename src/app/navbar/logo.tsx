import Image from "next/image";
import Link from "next/link";

const Logo = ({}) => {
  return (
    <>
      <Link
        href="/"
        className="inline-block order-1 ml-4 md:ml-0 lg:ml-0 items-center"
      >
        <Image
          className=""
          src="/amzlogo4.svg"
          alt="AMZ"
          width={40}
          height={40}
        />
      </Link>
    </>
  );
};

export default Logo;
