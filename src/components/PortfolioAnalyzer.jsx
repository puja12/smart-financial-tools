import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    Legend,
} from 'recharts'

export default function PortfolioAnalyzer() {
    const [portfolio, setPortfolio] = useState([
        {
            asset: 'Equity',
            allocation: 60,
        },
        {
            asset: 'Debt',
            allocation: 25,
        },
        {
            asset: 'Gold',
            allocation: 10,
        },
        {
            asset: 'Cash',
            allocation: 5,
        },
    ])

    const COLORS = [
        '#10b981',
        '#0f172a',
        '#f59e0b',
        '#38bdf8',
    ]

    const totalAllocation = useMemo(() => {
        return portfolio.reduce(
            (acc, item) => acc + item.allocation,
            0
        )
    }, [portfolio])

    const riskLevel = useMemo(() => {
        const equity =
            portfolio.find(
                (item) => item.asset === 'Equity'
            )?.allocation || 0

        if (equity >= 70) {
            return 'High Risk'
        }

        if (equity >= 50) {
            return 'Moderate Risk'
        }

        return 'Low Risk'
    }, [portfolio])

    const diversificationScore = useMemo(() => {
        if (portfolio.length >= 4) {
            return 92
        }

        if (portfolio.length >= 3) {
            return 75
        }

        return 55
    }, [portfolio])

    const handleChange = (index, value) => {
        const updated = [...portfolio]

        updated[index].allocation = Number(value)

        setPortfolio(updated)
    }

    return (
        <section className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="p-8 lg:p-10">
                    <div className="mb-10">
                        <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Portfolio Insights
                        </div>

                        <h2 className="text-4xl font-bold text-slate-900 mb-3">
                            Portfolio Analyzer
                        </h2>

                        <p className="text-slate-500 leading-relaxed">
                            Analyze your asset allocation and understand
                            portfolio diversification and risk exposure.
                        </p>
                    </div>

                    {/* ALLOCATION SLIDERS */}
                    <div className="space-y-6">
                        {portfolio.map((item, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-3xl p-5"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {item.asset}
                                        </h3>
                                    </div>

                                    <div className="text-xl font-bold text-emerald-600">
                                        {item.allocation}%
                                    </div>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={item.allocation}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="w-full accent-emerald-600"
                                />
                            </div>
                        ))}
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                            <p className="text-slate-500 text-sm mb-2">
                                Total Allocation
                            </p>

                            <h3 className="text-3xl font-bold text-slate-900">
                                {totalAllocation}%
                            </h3>
                        </div>

                        <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
                            <p className="text-emerald-700 text-sm mb-2">
                                Diversification
                            </p>

                            <h3 className="text-3xl font-bold text-emerald-700">
                                {diversificationScore}/100
                            </h3>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-8 lg:p-10 flex flex-col justify-between">
                    {/* TOP SECTION */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-slate-400 mb-2">
                                    Portfolio Risk
                                </p>

                                <h3 className="text-4xl font-bold text-emerald-400">
                                    {riskLevel}
                                </h3>
                            </div>

                            <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-4xl">
                                📊
                            </div>
                        </div>

                        {/* PIE CHART */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">
                            <div className="mb-4">
                                <h4 className="text-xl font-semibold">
                                    Asset Allocation
                                </h4>

                                <p className="text-slate-400 text-sm">
                                    Distribution of your portfolio assets.
                                </p>
                            </div>

                            <div className="h-72">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <PieChart>
                                        <Pie
                                            data={portfolio}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            dataKey="allocation"
                                            paddingAngle={4}
                                        >
                                            {portfolio.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            COLORS[
                                                            index % COLORS.length
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>

                                        <Tooltip />

                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* BAR CHART */}
                    <div>
                        <div className="mb-4">
                            <h4 className="text-xl font-semibold">
                                Allocation Comparison
                            </h4>

                            <p className="text-slate-400 text-sm">
                                Compare asset distribution visually.
                            </p>
                        </div>

                        <div className="h-72">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <BarChart data={portfolio}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#334155"
                                    />

                                    <XAxis
                                        dataKey="asset"
                                        stroke="#cbd5e1"
                                    />

                                    <YAxis stroke="#cbd5e1" />

                                    <Tooltip />

                                    <Bar
                                        dataKey="allocation"
                                        fill="#10b981"
                                        radius={[10, 10, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}