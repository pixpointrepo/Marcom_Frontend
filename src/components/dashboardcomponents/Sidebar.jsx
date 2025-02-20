import { useState } from "react";
import {
  Menu,
  X,
  Home,
  FileText,
  Tag,
  Users,
  LogOut,
  BookOpenText,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
  const handleLogout = () => {
    logout(); // Clear the authentication token
    // navigate("/pixadmin"); // Navigate to the login page
  };

  return (
    <div className="flex ">
      {/* Sidebar */}  
      <div
        className={`fixed md:sticky left-0 top-0 z-50 bg-gray-900 text-white w-64 h-screen p-5 transition-transform ${
          isOpen ? "translate-x-0 z-50 " : "-translate-x-full"
        } transition-transform  md:translate-x-0 md:w-64 `}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex w-full mb-6">
              <div className="flex flex-col md:flex-row w-full items-start md:space-x-4 md:items-end">
                <img
                  src="/pixpointLogo.png"
                  className="aspect-[3/2] h-10 mb-2 md:mb-0 ml-20  md:ml-0"
                />
                <h1 className="text-lg font-bold ">PixPoint News</h1>
              </div>
             
            </div>
            <button className="md:hidden  fixed top-6 right-4" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            <nav className="space-y-4">
              <SidebarItem
                to="/dashboard"
                icon={<Home size={20} />}
                label="Dashboard"
              />
              <SidebarItem
                to="/dashboard/articles"
                icon={<BookOpenText size={20} />}
                label="Articles"
              />
              <SidebarItem
                to="/dashboard/posts"
                icon={<FileText size={20} />}
                label="Posts"
              />
              <SidebarItem to="/users" icon={<Users size={20} />} label="Users" />
            </nav>
          </div>
          <div>
            <Link
              to="/dashboard/settings"
              className="mt-6 flex items-center text-white hover:text-blue-400"
            >
              <Settings size={20} className="mr-2" /> Settings
            </Link>
            <button
      onClick={handleLogout}
      className="mt-6 flex items-center text-red-500 hover:text-red-400"
    >
      <LogOut size={20} className="mr-2" /> Logout
    </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded z-50"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>
      
    </div>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center py-2 px-3 rounded hover:bg-gray-800"
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
}
