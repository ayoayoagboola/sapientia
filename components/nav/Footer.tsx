import Link from "next/link";
import React from "react";
import Image from "next/image";

// TODO: fix some styling + add columns

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="cursor-pointer flex gap-4">
              <Image
                src={"/assets/logo.png"}
                width={256}
                height={50}
                priority
                alt="Logo"
              />
            </Link>
            <p className="text-slate-500 text-base">
              a comprehensive, free online resource for Latin enthusiasts and
              learners. 🌱
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8"></div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-base text-slate-400 xl:text-center">
            © 2024 sapientia All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
