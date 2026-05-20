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
} from 'recharts'

export default function PortfolioAnalyzer() {
    const [portfolio, setPortfolio] = useState([
        {
            asset: 'Equity',
            allocation: 60,
            color: '#10b981',
        },
        {
            asset: 'Debt',
            allocation: 25,
            color: '#3b82f6',
        },
        {
            asset: 'Gold',
            allocation: 10,
            color: '#f59e0b',
        },
        {
            asset: 'Cash',
            allocation: 5,
            color: '#94a3b8',
        },
    ])

    const totalAllocation = useMemo(() => {
        return portfolio.reduce(
            (acc, item) => acc + item.allocation,
            0
        )
    }, [portfolio])

    const riskData = useMemo(() => {
        const equity =
            portfolio.find(
                (item) => item.asset === 'Equity'
            )?.allocation || 0

        if (equity >= 70) {
            return {
                level: 'High Risk',
                color: 'text-red-400',
                bg: 'bg-red-500/10',
                border: 'border-red-500/20',
                equity: '80%',
                debt: '20%',
            }
        }

        if (equity >= 50) {
            return {
                level: 'Moderate',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
                equity: '60%',
                debt: '40%',
            }
        }

        return {
            level: 'Low Risk',
            color: 'text-sky-400',
            bg: 'bg-sky-500/10',
            border: 'border-sky-500/20',
            equity: '30%',
            debt: '70%',
        }
    }, [portfolio])

    const diversificationScore = useMemo(() => {
        if (portfolio.length >= 4) {
            return 92
        }

        if (portfolio.length >= 3) {
            return 76
        }

        return 58
    }, [portfolio])

    const handleChange = (index, value) => {
        const updated = [...portfolio]

        updated[index].allocation = Number(value)

        setPortfolio(updated)
    }

    return (
        <section className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
            <div className="grid xl:grid-cols-[40%_60%]">
                {/* LEFT PANEL */}
                <div className="p-3 lg:p-4 border-b xl:border-b-0 xl:border-r border-slate-200">
                    {/* HEADER */}
                    <div className="mb-4">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
                            📊 Portfolio Insights
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            Portfolio Analyzer
                        </h2>

                        <p className="text-sm text-slate-500 leading-relaxed">
                            Understand diversification, allocation,
                            and overall investment risk exposure.
                        </p>
                    </div>

                    {/* SLIDERS */}
                    <div className="space-y-2.5">
                        {portfolio.map((item, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-3"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        />

                                        <h3 className="text-sm font-semibold text-slate-800">
                                            {item.asset}
                                        </h3>
                                    </div>

                                    <div className="text-sm font-bold text-slate-900">
                                        {item.allocation}%
                                    </div>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={item.allocation}
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    className="w-full h-1.5 accent-emerald-600"
                                />
                            </div>
                        ))}
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <div className="bg-slate-900 rounded-2xl p-4">
                            <p className="text-slate-400 text-xs mb-1">
                                Total Allocation
                            </p>

                            <h3 className="text-2xl font-bold text-white">
                                {totalAllocation}%
                            </h3>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                            <p className="text-emerald-700 text-xs mb-1">
                                Diversification
                            </p>

                            <h3 className="text-2xl font-bold text-emerald-700">
                                {diversificationScore}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 lg:p-5 text-white">
                    {/* TOP */}
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <p className="text-slate-400 text-sm mb-2">
                                Portfolio Risk
                            </p>

                            <h3
                                className={`text-2xl font-bold ${riskData.color}`}
                            >
                                {riskData.level}
                            </h3>
                        </div>

                        <div
                            className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-xl ${riskData.bg} ${riskData.border}`}
                        >
                            📈
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <p className="text-slate-400 text-xs mb-1">
                                Suggested Equity
                            </p>

                            <h4 className="text-2xl font-bold text-emerald-400">
                                {riskData.equity}
                            </h4>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                            <p className="text-slate-400 text-xs mb-1">
                                Suggested Debt
                            </p>

                            <h4 className="text-2xl font-bold text-sky-400">
                                {riskData.debt}
                            </h4>
                        </div>
                    </div>

                    {/* CHARTS */}
                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* PIE */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
                            <div className="mb-3">
                                <h4 className="font-semibold">
                                    Allocation Split
                                </h4>

                                <p className="text-slate-400 text-xs">
                                    Portfolio distribution.
                                </p>
                            </div>

                            <div className="h-56">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <PieChart>
                                        <Pie
                                            data={portfolio}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            dataKey="allocation"
                                            paddingAngle={4}
                                        >
                                            {portfolio.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            entry.color
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>

                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* LEGEND */}
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {portfolio.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        item.color,
                                                }}
                                            />

                                            <span className="text-xs text-slate-300">
                                                {item.asset}
                                            </span>
                                        </div>

                                        <span className="text-xs font-semibold">
                                            {item.allocation}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BAR */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
                            <div className="mb-3">
                                <h4 className="font-semibold">
                                    Allocation Comparison
                                </h4>

                                <p className="text-slate-400 text-xs">
                                    Compare asset classes.
                                </p>
                            </div>

                            <div className="h-72">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <BarChart
                                        data={portfolio}
                                        barSize={36}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#334155"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="asset"
                                            stroke="#94a3b8"
                                            tickLine={false}
                                            axisLine={false}
                                        />

                                        <YAxis
                                            stroke="#94a3b8"
                                            tickLine={false}
                                            axisLine={false}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                background:
                                                    '#0f172a',
                                                border:
                                                    '1px solid #1e293b',
                                                borderRadius:
                                                    '16px',
                                                color: '#fff',
                                            }}
                                        />

                                        <Bar
                                            dataKey="allocation"
                                            radius={[
                                                12,
                                                12,
                                                0,
                                                0,
                                            ]}
                                        >
                                            {portfolio.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            entry.color
                                                        }
                                                    />
                                                )
                                            )}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}