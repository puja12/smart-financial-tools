export default function DashboardCard({
    title,
    subtitle,
    children,
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 lg:p-6">
            <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                    {title}
                </h3>

                {subtitle && (
                    <p className="text-sm text-slate-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

            {children}
        </div>
    )
}