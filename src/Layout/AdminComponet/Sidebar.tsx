import { X, LayoutDashboard, Database,CassetteTape ,LogOut,MailIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { openModal } from "../../Redux/Reducers/ModalReducer";

export default function Sidebar({ open, setOpen }:any) {
  const { pathname } = useLocation();
  const dispatch=useDispatch()

  const menus = [
    {
      name: "Dashboard",
      to: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      to: "/admin/products",
      icon: Database,
    },
    {
      name:"category",
      to:"/admin/category",
      icon:CassetteTape
    },

    {
      name:"Enquiry",
      to:"/admin/enquirymangeMent",
      icon:MailIcon
    }
    // {
    //   name: "Users",
    //   to: "/admin/users",
    //   icon: Users,
    // },
    // {
    //   name: "Settings",
    //   to: "/admin/settings",
    //   icon: Settings,
    // },
    
  ];


  
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    window.location.href = "/login";
  }

  const handleModalOpen=()=>{
      dispatch((openModal(
        {
          modalname:"CONFIRAMTIONMODAL",
          data:{
            onOk:()=>handleLogout(),
            width:"xl"
          }
        }
      )))
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50
        h-screen w-72 bg-slate-900 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="border-b border-slate-700 p-6 text-2xl font-bold">
          Rico Tech

          
        </div>

        <nav className="p-4 space-y-2">
          {menus?.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.to}
                to={menu.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg p-3 ${
                  pathname === menu.to
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                {menu.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <button
           onClick={() => handleModalOpen()}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 py-3 hover:bg-red-700">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}