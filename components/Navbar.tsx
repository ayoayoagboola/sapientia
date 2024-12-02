import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import UserIcon from "./user/UserIcon";


// TODO: add search bar

const Navbar = () => {
  return (
    <div className="flex w-full h-12 items-center justify-between p-3 border-b border-slate-200">
      <SidebarTrigger />
      <UserIcon />
    </div>
  );
};

export default Navbar;
