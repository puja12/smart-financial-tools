import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

export default function GoalPlanner() {
    const [goalName, setGoalName] = useState('Dream House')
    const [goalAmount, setGoalAmount] = useState(5000000)
    const [currentSavings, setCurrentSavings] = useState(500000)
    const [years, setYears] = useState(10)
    const [returnRate, setReturnRate] = useState(12)
    const [inflationRate, setInflationRate] = useState(6)

    const calculations = useMemo(() => {
        const futureGoalValue =
            goalAmount * Math.pow(1 + inflationRate / 100, years)

        const monthlyRate = returnRate / 12 / 100
        const months = years * 12

        const futureCurrentSavings =
            currentSavings * Math.pow(1 + returnRate / 100, years)

        const remainingGoal =
            futureGoalValue - futureCurrentSavings

        const requiredSip =
            remainingGoal /
            (((Math.pow(1 + monthlyRate, months) - 1) /
                monthlyRate) *
                (1 + monthlyRate))

        return {
            futureGoalValue,
            requiredSip,
            futureCurrentSavings,
            remainingGoal,
        }
    }, [
        goalAmount,
        currentSavings,
        years,
        returnRate,
        inflationRate,
    ])

    const growthData = useMemo(() => {
        const data = []

        let invested = currentSavings

        for (let i = 1; i <= years; i++) {
            invested =
                (invested + calculations.requiredSip * 12) *
                (1 + returnRate / 100)

            data.push({
                year: `Year ${i}`,
                value: Math.round(invested),
            })
        }

        return data
    }, [
        calculations.requiredSip,
        currentSavings,
        years,
        returnRate,
    ])

    return (
        <section className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="p-8 lg:p-10">
                    <div className="mb-8">
                        <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Goal Planning
                        </div>

                        <h2 className="text-4xl font-bold text-slate-900 mb-3">
                            Plan Your Financial Goals
                        </h2>

                        <p className="text-slate-500 leading-relaxed">
                            Calculate how much SIP you need to achieve your
                            financial goals with inflation-adjusted planning.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Goal Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Goal Name
                            </label>

                            <input
                                type="text"
                                value={goalName}
                                onChange={(e) =>
                                    setGoalName(e.target.value)
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-4 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition"
                                placeholder="Dream House"
                            />
                        </div>

                        {/* Goal Amount */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Goal Amount
                                </label>

                                <span className="font-bold text-emerald-600">
                                    ₹ {goalAmount.toLocaleString()}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="100000"
                                max="50000000"
                                step="100000"
                                value={goalAmount}
                                onChange={(e) =>
                                    setGoalAmount(Number(e.target.value))
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Current Savings */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Current Savings
                                </label>

                                <span className="font-bold text-emerald-600">
                                    ₹ {currentSavings.toLocaleString()}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="50000"
                                value={currentSavings}
                                onChange={(e) =>
                                    setCurrentSavings(Number(e.target.value))
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Years */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Years to Goal
                                </label>

                                <span className="font-bold text-emerald-600">
                                    {years} Years
                                </span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="40"
                                value={years}
                                onChange={(e) =>
                                    setYears(Number(e.target.value))
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Return Rate */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Expected Return
                                </label>

                                <span className="font-bold text-emerald-600">
                                    {returnRate}%
                                </span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="25"
                                value={returnRate}
                                onChange={(e) =>
                                    setReturnRate(Number(e.target.value))
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Inflation */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Inflation Rate
                                </label>

                                <span className="font-bold text-emerald-600">
                                    {inflationRate}%
                                </span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="15"
                                value={inflationRate}
                                onChange={(e) =>
                                    setInflationRate(Number(e.target.value))
                                }
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-slate-400 mb-2">
                                    Goal
                                </p>

                                <h3 className="text-3xl font-bold">
                                    {goalName}
                                </h3>
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                                🎯
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
                            <p className="text-slate-300 mb-3">
                                Required Monthly SIP
                            </p>

                            <h2 className="text-5xl font-bold text-emerald-400 mb-4">
                                ₹{' '}
                                {Math.round(
                                    calculations.requiredSip
                                ).toLocaleString()}
                            </h2>

                            <p className="text-slate-400">
                                Invest monthly to achieve your goal.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                                <p className="text-slate-400 text-sm mb-2">
                                    Future Goal Value
                                </p>

                                <h4 className="text-2xl font-bold">
                                    ₹{' '}
                                    {Math.round(
                                        calculations.futureGoalValue
                                    ).toLocaleString()}
                                </h4>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                                <p className="text-slate-400 text-sm mb-2">
                                    Future Savings
                                </p>

                                <h4 className="text-2xl font-bold">
                                    ₹{' '}
                                    {Math.round(
                                        calculations.futureCurrentSavings
                                    ).toLocaleString()}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* CHART */}
                    <div className="mt-10">
                        <div className="mb-4">
                            <h4 className="text-xl font-semibold">
                                Wealth Growth Projection
                            </h4>

                            <p className="text-slate-400 text-sm">
                                Estimated portfolio growth over time.
                            </p>
                        </div>

                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData}>
                                    <defs>
                                        <linearGradient
                                            id="colorGrowth"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#10b981"
                                                stopOpacity={0.8}
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

                                    <YAxis stroke="#94a3b8" />

                                    <Tooltip />

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10b981"
                                        fillOpacity={1}
                                        fill="url(#colorGrowth)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}