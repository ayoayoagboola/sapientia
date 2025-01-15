// TODO: add search bar

import { SidebarTrigger } from "../ui/sidebar";
import UserIcon from "../user/UserAvatar";
import CreateDropdown from "../dropdowns/CreateDropdown";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <div className="flex w-full h-12 bg-slate-50 items-center justify-between sticky top-0 z-10 p-3 border-b border-slate-200">
      <SidebarTrigger />
      <Searchbar />
      <div className="flex items-center justify-center gap-3">
        <CreateDropdown />
        <UserIcon />
      </div>
    </div>
  );
};

export default Navbar;
