import Link from "next/link";
import Image from "next/image";
import CYFLogo from "@public/img/cyf.png";

export default function Logo() {
  const logo = CYFLogo;

  return (
    <Link href="/" className="flex justify-center items-center px-6">
      <Image
        key={logo}
        src={logo}
        width={1000}
        height={1000}
        alt="cyf"
        className="w-32"
        priority
      />
    </Link>
  );
}
