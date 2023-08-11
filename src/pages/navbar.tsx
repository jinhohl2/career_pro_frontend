import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="p-5 bg-black fixed w-full z-10 top-0">
  <div className="container mx-auto flex flex-wrap items-center justify-between">
    <div className="flex justify-start">
      <Link legacyBehavior href="/">
        <a className="text-base sm:text-lg md:text-xl lg:text-2xl px-2 text-white hover:text-gray-500">CareerPro</a>
      </Link>
    </div>
    <div className="flex justify-end space-x-4">
      <Link legacyBehavior href="/interview">
        <a className="text-base sm:text-lg md:text-xl lg:text-2xl px-2 text-white hover:text-gray-500">Interview Mode</a>
      </Link>
      <Link legacyBehavior href="/prompt">
        <a className="text-base sm:text-lg md:text-xl lg:text-2xl px-2 text-white hover:text-gray-500">Prompt Mode</a>
      </Link>
    </div>
  </div>
</nav>


    )
}

export default NavBar;
