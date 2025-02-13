"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

const TransitionLink = ({ href, label }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router); // Pass only href and router
    }
  };

  return (
    <button
      className="text-xl text-yellow-500 hover:text-yellow-700"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TransitionLink;
