import { useState, useContext } from "react";
import {
  Menu,
  X,
  Home,
  FileText,
  Tag,
  Users,
  LogOut,
  BookOpenText,
  Settings,
  FolderCog,
  Inbox, 
  ChartColumnIncreasing ,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ConfirmDialog from "../../components/ui/ConformDialog"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear the authentication token
    navigate("/pixadmin"); // Navigate to the login page
    setIsDialogOpen(false); // Close the dialog
  };

  const openLogoutDialog = () => {
    setIsDialogOpen(true);
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
          <div className="">
            <div className="flex w-full mb-6">
              <div className="flex flex-col md:flex-row w-full items-start md:space-x-4 md:items-end ">
                <img
                  src="/marcom.jpg"
                  className="aspect-[3/2] md:h-14 h-10 md:w-full w-[65%] mb-2 md:mb-0 ml-10  md:ml-0 rounded-lg "
                />
                {/* <h1 className="text-2xl font-bold ">Marcom</h1> */}
              </div>
            </div>
            <button
              className="md:hidden fixed top-6 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <nav className="space-y-4">
              <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard"
                icon={<Home size={20} />}
                label="Dashboard"
              />
              <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard/articles"
                icon={<BookOpenText size={20} />}
                label="Articles"
              />
              <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard/posts"
                icon={<FileText size={20} />}
                label="New Post"
              />
              <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard/manage-content"
                icon={<FolderCog size={20} />}
                label="Manage Contents"
              />
               <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard/entries"
                icon={<Inbox size={20} />}
                label="View Form Entries"
              />

<SidebarItem
                setSidebarOpen={setIsOpen}
                to="/dashboard/analytics"
                icon={<ChartColumnIncreasing size={20} />}
                label="Analytics"
              />
              {/* <SidebarItem
                setSidebarOpen={setIsOpen}
                to="/users"
                icon={<Users size={20} />}
                label="Users"
              /> */}
            </nav>
          </div>
          <div>
            {/* <Link
              to="/dashboard/settings"
              className="mt-6 flex items-center text-white hover:text-blue-400"
            >
              <Settings size={20} className="mr-2" /> Settings
            </Link> */}
            <button
              onClick={openLogoutDialog}
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

      {/* ConfirmDialog for Logout */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Stay"
      />
    </div>
  );
}

function SidebarItem({ to, icon, label, setSidebarOpen }) {
  const handleClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };
  return (
    <Link
      to={to}
      onClick={handleClick}
      className="flex items-center py-2 px-3 rounded hover:bg-gray-800"
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
}