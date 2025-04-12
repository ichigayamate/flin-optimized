import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 fixed top-0 left-0 w-full bg-white border-b border-neutral-500">
      <section>
        <Link href="/">
          <Image
            src="/flin-logo.webp"
            alt="Flin Logo"
            width={100}
            height={200}
            loading="eager"
          />
        </Link>
      </section>
      <section></section>
    </header>
  );
}
