import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 fixed top-0 left-0 w-full bg-white border-b border-neutral-500">
      <section>
        <Link href="/">
          <img src="/flin-logo.webp" alt="Flin Logo" width={100} height={200} />
        </Link>
      </section>
      <section></section>
    </header>
  );
}
