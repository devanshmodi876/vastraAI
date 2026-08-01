import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({children}){
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">

            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 min-h-screen p-10 overflow-y-auto">
                {children}
                </main>

            </div>

        </div>
    )
}

export default MainLayout;