export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                        IK
                    </div>

                    <div>
                        <h1 className="font-bold text-xl text-slate-800">
                            InvestKit
                        </h1>
                        <p className="text-sm text-slate-500">
                            Smart Wealth Planning
                        </p>
                    </div>
                </div>

                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-medium transition">
                    Get Started
                </button>
            </div>
        </header>
    )
}