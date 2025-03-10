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
  ChartColumnIncreasing,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ConfirmDialog from "../../components/ui/ConformDialog";

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
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:w-64 overflow-hidden`}
      >
        {/* Background Image (Blurred) */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(85px)", // Apply blur only to the background
            zIndex: -1, // Ensure the background stays behind the content
          }}
        />

        {/* Sidebar Contenit */}
        <div className="flex flex-col h-full justify-between relative z-10">
          <div>
            <div className="flex flex-col mb-4 md:flex-row w-full items-start md:space-x-4 md:items-center justify-center">
              <img
                src="/marcom.jpg"
                className=" md:w-34 md:h-auto h-10 w-[65%] mb-2 md:mb-0 ml-10 md:ml-0 rounded-lg"
              />
            </div>

            <button
              className="md:hidden fixed top-6 right-4 z-50"
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
                to="/dashboard/analytics"
                icon={<ChartColumnIncreasing size={20} />}
                label="Analytics"
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
            </nav>
          </div>
          <div>
            <button
              onClick={openLogoutDialog}
              className="mt-6 flex items-center font-semibold bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded-md  "
            >
              <LogOut size={20} className="mr-2 " /> Logout
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
      className="flex items-center py-2 px-3 rounded hover:bg-gray-800 hover:shadow-[1px_1px_10px_3px_rgba(255,255,255,0.1)] transition"
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Link>
  );
}
