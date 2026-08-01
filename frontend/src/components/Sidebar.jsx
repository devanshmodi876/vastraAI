import History from "./History";

function Sidebar() {
  return (
    <aside className="w-80 bg-slate-900 text-white h-screen sticky top-0 p-6 overflow-y-auto">
      <History />
    </aside>
  );
}

export default Sidebar;