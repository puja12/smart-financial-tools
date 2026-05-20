import { useMemo, useState } from 'react'

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
} from 'recharts'

export default function SIPCalculator() {

    const [monthlyInvestment, setMonthlyInvestment] =
        useState(10000)

    const [investmentPeriod, setInvestmentPeriod] =
        useState(15)

    const [expectedReturn, setExpectedReturn] =
        useState(12)

    const calculations = useMemo(() => {

        const monthlyRate =
            expectedReturn / 12 / 100

        const months =
            investmentPeriod * 12

        const futureValue =
            monthlyInvestment *
            (((Math.pow(
                1 + monthlyRate,
                months
            ) - 1) / monthlyRate) *
                (1 + monthlyRate))

        const investedAmount =
            monthlyInvestment * months

        const estimatedReturns =
            futureValue -
            investedAmount

        return {
            futureValue,
            investedAmount,
            estimatedReturns,
        }

    }, [
        monthlyInvestment,
        investmentPeriod,
        expectedReturn,
    ])

    const pieData = [
        {
            name: 'Invested',
            value:
                calculations.investedAmount,
        },
        {
            name: 'Returns',
            value:
                calculations.estimatedReturns,
        },
    ]

    const growthData = useMemo(() => {

        const data = []

        const monthlyRate =
            expectedReturn / 12 / 100

        for (
            let year = 1;
            year <= investmentPeriod;
            year++
        ) {

            const months = year * 12

            const total =
                monthlyInvestment *
                (((Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1) / monthlyRate) *
                    (1 + monthlyRate))

            data.push({
                year: `${year}Y`,
                value: Math.round(total),
            })
        }

        return data

    }, [
        monthlyInvestment,
        expectedReturn,
        investmentPeriod,
    ])

    const COLORS = [
        '#10b981',
        '#1e293b',
    ]

    return (
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="grid xl:grid-cols-[380px_1fr]">

                {/* LEFT PANEL */}
                <div className="border-b xl:border-b-0 xl:border-r border-slate-200 bg-slate-50/70 p-5">

                    {/* HEADER */}
                    <div className="mb-5">

                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-700">
                            📈 SIP Calculator
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-slate-900">
                            Investment Planner
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            Estimate future wealth generated through disciplined monthly investing.
                        </p>

                    </div>

                    {/* INPUTS */}
                    <div className="space-y-4">

                        {/* MONTHLY */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-semibold text-slate-700">
                                    Monthly Investment
                                </label>

                                <span className="text-base font-bold text-emerald-600">
                                    ₹ {monthlyInvestment.toLocaleString()}
                                </span>

                            </div>

                            <input
                                type="range"
                                min="500"
                                max="200000"
                                step="500"
                                value={monthlyInvestment}
                                onChange={(e) =>
                                    setMonthlyInvestment(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />

                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                                <span>₹500</span>
                                <span>₹2L</span>
                            </div>

                        </div>

                        {/* PERIOD */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-semibold text-slate-700">
                                    Investment Period
                                </label>

                                <span className="text-base font-bold text-emerald-600">
                                    {investmentPeriod} Years
                                </span>

                            </div>

                            <input
                                type="range"
                                min="1"
                                max="40"
                                value={investmentPeriod}
                                onChange={(e) =>
                                    setInvestmentPeriod(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />

                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                                <span>1Y</span>
                                <span>40Y</span>
                            </div>

                        </div>

                        {/* RETURN */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">

                            <div className="mb-3 flex items-center justify-between">

                                <label className="text-sm font-semibold text-slate-700">
                                    Expected Return
                                </label>

                                <span className="text-base font-bold text-emerald-600">
                                    {expectedReturn}%
                                </span>

                            </div>

                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={expectedReturn}
                                onChange={(e) =>
                                    setExpectedReturn(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />

                            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                                <span>1%</span>
                                <span>30%</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 text-white">

                    {/* TOP */}
                    <div className="mb-5 flex items-start justify-between">

                        <div>

                            <p className="text-sm text-slate-400">
                                Future Wealth
                            </p>

                            <h3 className="mt-2 text-4xl font-black text-white">
                                ₹{' '}
                                {Math.round(
                                    calculations.futureValue
                                ).toLocaleString()}
                            </h3>

                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-2xl">
                            🚀
                        </div>

                    </div>

                    {/* METRICS */}
                    <div className="grid gap-3 md:grid-cols-3">

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                            <p className="text-xs text-slate-400">
                                Invested Amount
                            </p>

                            <h4 className="mt-2 text-xl font-bold text-white">
                                ₹{' '}
                                {Math.round(
                                    calculations.investedAmount
                                ).toLocaleString()}
                            </h4>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-emerald-500/10 p-4 backdrop-blur-xl">

                            <p className="text-xs text-emerald-200">
                                Estimated Returns
                            </p>

                            <h4 className="mt-2 text-xl font-bold text-emerald-400">
                                ₹{' '}
                                {Math.round(
                                    calculations.estimatedReturns
                                ).toLocaleString()}
                            </h4>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                            <p className="text-xs text-slate-400">
                                Expected CAGR
                            </p>

                            <h4 className="mt-2 text-xl font-bold text-white">
                                {expectedReturn}%
                            </h4>

                        </div>

                    </div>

                    {/* CHARTS */}
                    <div className="mt-5 grid gap-5 xl:grid-cols-2">

                        {/* PIE */}
                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                            <div className="mb-3">

                                <h4 className="text-lg font-bold">
                                    Investment Split
                                </h4>

                                <p className="text-sm text-slate-400">
                                    Invested vs returns
                                </p>

                            </div>

                            <div className="h-56">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >

                                            {pieData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (
                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            COLORS[
                                                            index
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* AREA */}
                        <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                            <div className="mb-3">

                                <h4 className="text-lg font-bold">
                                    Wealth Growth
                                </h4>

                                <p className="text-sm text-slate-400">
                                    Portfolio projection
                                </p>

                            </div>

                            <div className="h-56">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <AreaChart
                                        data={growthData}
                                    >

                                        <defs>

                                            <linearGradient
                                                id="growth"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >

                                                <stop
                                                    offset="5%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.4}
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0}
                                                />

                                            </linearGradient>

                                        </defs>

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#334155"
                                        />

                                        <XAxis
                                            dataKey="year"
                                            stroke="#94a3b8"
                                        />

                                        <YAxis
                                            stroke="#94a3b8"
                                        />

                                        <Tooltip />

                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#growth)"
                                        />

                                    </AreaChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}