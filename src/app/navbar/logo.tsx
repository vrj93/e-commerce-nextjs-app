import Image from "next/image";
import Link from "next/link";

const Logo = ({}) => {
  return (
    <Link href="/">
      <Image
        className="mx-auto h-10 w-auto"
        src="/amzlogo4.svg"
        alt="AMZ"
        width={0}
        height={0}
      />
    </Link>
  );
};

export default Logo;
