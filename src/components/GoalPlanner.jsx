import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from 'recharts'

export default function GoalPlanner() {
    const [goalName, setGoalName] =
        useState('Dream House')

    const [goalAmount, setGoalAmount] =
        useState(5000000)

    const [currentSavings, setCurrentSavings] =
        useState(500000)

    const [years, setYears] =
        useState(10)

    const [returnRate, setReturnRate] =
        useState(12)

    const [inflationRate, setInflationRate] =
        useState(6)

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(value)
    }

    const calculations = useMemo(() => {
        const futureGoalValue =
            goalAmount *
            Math.pow(
                1 + inflationRate / 100,
                years
            )

        const monthlyRate =
            returnRate / 12 / 100

        const months = years * 12

        const futureCurrentSavings =
            currentSavings *
            Math.pow(
                1 + returnRate / 100,
                years
            )

        const remainingGoal =
            futureGoalValue -
            futureCurrentSavings

        const requiredSip =
            remainingGoal > 0
                ? remainingGoal /
                (((Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1) /
                    monthlyRate) *
                    (1 + monthlyRate))
                : 0

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

        let corpus = currentSavings

        for (let i = 1; i <= years; i++) {
            corpus =
                (corpus +
                    calculations.requiredSip * 12) *
                (1 + returnRate / 100)

            data.push({
                year: `Y${i}`,
                value: Math.round(corpus),
            })
        }

        return data
    }, [
        calculations.requiredSip,
        currentSavings,
        years,
        returnRate,
    ])

    const pieData = [
        {
            name: 'Savings',
            value:
                calculations.futureCurrentSavings,
        },
        {
            name: 'SIP Contribution',
            value:
                calculations.remainingGoal > 0
                    ? calculations.remainingGoal
                    : 0,
        },
    ]

    const COLORS = ['#10b981', '#1e293b']

    return (
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            <div className="grid xl:grid-cols-[420px_1fr]">

                {/* LEFT PANEL */}
                <div className="border-b xl:border-b-0 xl:border-r border-slate-200 bg-slate-50/70 p-5 lg:p-6">

                    {/* HEADER */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-700">
                            🎯 Goal Planning
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-slate-900">
                            Financial Goal Planner
                        </h2>

                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            Estimate the SIP required to
                            achieve your future financial
                            goals after considering inflation.
                        </p>
                    </div>

                    {/* INPUTS */}
                    <div className="space-y-5">

                        {/* GOAL NAME */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Goal Name
                            </label>

                            <input
                                type="text"
                                value={goalName}
                                onChange={(e) =>
                                    setGoalName(
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                placeholder="Dream House"
                            />
                        </div>

                        {/* GOAL AMOUNT */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-semibold text-slate-700">
                                    Goal Amount
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
                                    ₹{' '}
                                    {formatCurrency(
                                        goalAmount
                                    )}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="100000"
                                max="50000000"
                                step="100000"
                                value={goalAmount}
                                onChange={(e) =>
                                    setGoalAmount(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />
                        </div>

                        {/* SAVINGS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-semibold text-slate-700">
                                    Current Savings
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
                                    ₹{' '}
                                    {formatCurrency(
                                        currentSavings
                                    )}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="50000"
                                value={currentSavings}
                                onChange={(e) =>
                                    setCurrentSavings(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />
                        </div>

                        {/* YEARS */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-semibold text-slate-700">
                                    Years to Goal
                                </label>

                                <span className="text-lg font-bold text-emerald-600">
                                    {years} Years
                                </span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="40"
                                value={years}
                                onChange={(e) =>
                                    setYears(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full accent-emerald-600"
                            />
                        </div>

                        {/* RETURN + INFLATION */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Return
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
                                        setReturnRate(
                                            Number(
                                                e.target
                                                    .value
                                            )
                                        )
                                    }
                                    className="w-full accent-emerald-600"
                                />
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Inflation
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
                                        setInflationRate(
                                            Number(
                                                e.target
                                                    .value
                                            )
                                        )
                                    }
                                    className="w-full accent-emerald-600"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 lg:p-6 text-white">

                    {/* TOP */}
                    <div className="mb-5 flex items-start justify-between">
                        <div>
                            <p className="text-sm text-slate-400">
                                Financial Goal
                            </p>

                            <h3 className="mt-1 text-3xl font-bold">
                                {goalName}
                            </h3>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-3xl">
                            🎯
                        </div>
                    </div>

                    {/* SIP CARD */}
                    {/* SIP CARD */}
                    <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                        {/* TOP */}
                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                                    Required Monthly SIP
                                </p>

                                <h2 className="mt-2 text-4xl font-black leading-none text-white">
                                    ₹{' '}
                                    {formatCurrency(
                                        calculations.requiredSip
                                    )}
                                </h2>

                                <p className="mt-2 text-sm text-slate-400">
                                    Monthly investment required
                                </p>
                            </div>

                            {/* MINI STATS */}
                            <div className="grid grid-cols-3 gap-3">

                                <div className="min-w-[110px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                        Goal
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-white">
                                        ₹{' '}
                                        {formatCurrency(
                                            calculations.futureGoalValue
                                        )}
                                    </h4>
                                </div>

                                <div className="min-w-[110px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                        Savings
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-emerald-400">
                                        ₹{' '}
                                        {formatCurrency(
                                            calculations.futureCurrentSavings
                                        )}
                                    </h4>
                                </div>

                                <div className="min-w-[90px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                        Years
                                    </p>

                                    <h4 className="mt-1 text-sm font-bold text-white">
                                        {years}Y
                                    </h4>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CHARTS */}
                    <div className="mt-5 grid gap-5 xl:grid-cols-2">

                        {/* AREA CHART */}
                        <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">
                                    Goal Growth
                                </h4>

                                <p className="text-sm text-slate-400">
                                    Estimated wealth
                                    projection over time
                                </p>
                            </div>

                            <div className="h-64">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <AreaChart
                                        data={growthData}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="goalGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#10b981"
                                                    stopOpacity={
                                                        0.8
                                                    }
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#10b981"
                                                    stopOpacity={
                                                        0
                                                    }
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
                                            tickFormatter={(
                                                value
                                            ) =>
                                                `${Math.round(
                                                    value /
                                                    100000
                                                )}L`
                                            }
                                        />

                                        <Tooltip
                                            formatter={(
                                                value
                                            ) =>
                                                `₹ ${formatCurrency(
                                                    value
                                                )}`
                                            }
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#goalGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* PIE CHART */}
                        <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                            <div className="mb-4">
                                <h4 className="text-lg font-semibold">
                                    Funding Split
                                </h4>

                                <p className="text-sm text-slate-400">
                                    Savings vs SIP contribution
                                </p>
                            </div>

                            <div className="h-64">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (
                                                    <Cell
                                                        key={
                                                            index
                                                        }
                                                        fill={
                                                            COLORS[
                                                            index %
                                                            COLORS.length
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>

                                        <Tooltip
                                            formatter={(
                                                value
                                            ) =>
                                                `₹ ${formatCurrency(
                                                    value
                                                )}`
                                            }
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-4 space-y-3">
                                {pieData.map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{
                                                        background:
                                                            COLORS[
                                                            index
                                                            ],
                                                    }}
                                                />

                                                <span className="text-sm text-slate-300">
                                                    {
                                                        item.name
                                                    }
                                                </span>
                                            </div>

                                            <span className="font-semibold">
                                                ₹{' '}
                                                {formatCurrency(
                                                    item.value
                                                )}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}