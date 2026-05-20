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

        const months = investmentPeriod * 12

        const futureValue =
            monthlyInvestment *
            (((Math.pow(1 + monthlyRate, months) - 1) /
                monthlyRate) *
                (1 + monthlyRate))

        const investedAmount =
            monthlyInvestment * months

        const estimatedReturns =
            futureValue - investedAmount

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
            value: calculations.investedAmount,
        },
        {
            name: 'Returns',
            value: calculations.estimatedReturns,
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
                ) - 1) /
                    monthlyRate) *
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

    const COLORS = ['#10b981', '#0f172a']

    return (
        <div className="space-y-5">
            {/* TOP METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">
                            💰
                        </div>

                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            INVESTED
                        </span>
                    </div>

                    <p className="text-sm text-slate-500 mb-2">
                        Total Invested
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">
                        ₹{' '}
                        {Math.round(
                            calculations.investedAmount
                        ).toLocaleString()}
                    </h2>
                </div>

                <div className="bg-emerald-600 rounded-3xl p-5 text-white shadow-xl shadow-emerald-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
                            📈
                        </div>

                        <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                            RETURNS
                        </span>
                    </div>

                    <p className="text-sm text-emerald-100 mb-2">
                        Estimated Returns
                    </p>

                    <h2 className="text-3xl font-bold">
                        ₹{' '}
                        {Math.round(
                            calculations.estimatedReturns
                        ).toLocaleString()}
                    </h2>
                </div>

                <div className="bg-slate-900 rounded-3xl p-5 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                            🚀
                        </div>

                        <span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full">
                            FUTURE VALUE
                        </span>
                    </div>

                    <p className="text-sm text-slate-400 mb-2">
                        Wealth Generated
                    </p>

                    <h2 className="text-3xl font-bold">
                        ₹{' '}
                        {Math.round(
                            calculations.futureValue
                        ).toLocaleString()}
                    </h2>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid xl:grid-cols-[380px_1fr] gap-5">
                {/* CONTROLS */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            📊 SIP Calculator
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-3">
                            Investment Planner
                        </h2>

                        <p className="text-slate-500 leading-relaxed">
                            Calculate future wealth generated through
                            systematic monthly investments.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* MONTHLY INVESTMENT */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-semibold text-slate-700">
                                    Monthly Investment
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
                                    ₹{' '}
                                    {monthlyInvestment.toLocaleString()}
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

                            <div className="flex justify-between mt-2 text-xs text-slate-400">
                                <span>₹500</span>
                                <span>₹2L</span>
                            </div>
                        </div>

                        {/* PERIOD */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-semibold text-slate-700">
                                    Investment Period
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
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

                            <div className="flex justify-between mt-2 text-xs text-slate-400">
                                <span>1Y</span>
                                <span>40Y</span>
                            </div>
                        </div>

                        {/* RETURNS */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-semibold text-slate-700">
                                    Expected Return
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
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

                            <div className="flex justify-between mt-2 text-xs text-slate-400">
                                <span>1%</span>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHARTS */}
                <div className="grid lg:grid-cols-2 gap-5">
                    {/* PIE CHART */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Investment Breakdown
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Invested amount vs returns
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                🥧
                            </div>
                        </div>

                        <div className="h-[320px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={115}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map(
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

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border:
                                                '1px solid #e2e8f0',
                                            backgroundColor: '#fff',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div className="bg-slate-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>

                                    <span className="text-sm text-slate-600">
                                        Invested
                                    </span>
                                </div>

                                <h4 className="font-bold text-slate-900">
                                    ₹{' '}
                                    {Math.round(
                                        calculations.investedAmount
                                    ).toLocaleString()}
                                </h4>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-900"></div>

                                    <span className="text-sm text-slate-600">
                                        Returns
                                    </span>
                                </div>

                                <h4 className="font-bold text-slate-900">
                                    ₹{' '}
                                    {Math.round(
                                        calculations.estimatedReturns
                                    ).toLocaleString()}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* GROWTH CHART */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Wealth Growth
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Yearly portfolio growth
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                                📈
                            </div>
                        </div>

                        <div className="h-[320px]">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient
                                            id="sipGrowth"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#10b981"
                                                stopOpacity={0.35}
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
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        dataKey="year"
                                        stroke="#64748b"
                                    />

                                    <YAxis
                                        stroke="#64748b"
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border:
                                                '1px solid #e2e8f0',
                                            backgroundColor: '#fff',
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#sipGrowth)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                            <p className="text-sm text-emerald-700 mb-1">
                                Wealth Insight
                            </p>

                            <h4 className="font-semibold text-emerald-900 leading-relaxed">
                                Your SIP can potentially grow to{' '}
                                ₹{' '}
                                {Math.round(
                                    calculations.futureValue
                                ).toLocaleString()}{' '}
                                in {investmentPeriod} years.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}