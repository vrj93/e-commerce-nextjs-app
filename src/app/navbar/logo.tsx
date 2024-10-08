import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ({}) => {
  const router = useRouter();
  return (
    <a href="#" onClick={() => router.push("/")}>
      <Image
        className="mx-auto h-10 w-auto"
        src="/amzlogo4.svg"
        alt="AMZ"
        width={0}
        height={0}
      />
    </a>
  );
};

export default Logo;
