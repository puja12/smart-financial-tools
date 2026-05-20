import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    RadialBarChart,
    RadialBar,
} from 'recharts'

export default function RiskProfiler() {

    const questions = [
        {
            id: 1,
            question: 'Age Group',
            icon: '👤',
            options: [
                { label: '18 - 30', score: 5 },
                { label: '31 - 45', score: 4 },
                { label: '46 - 60', score: 2 },
                { label: '60+', score: 1 },
            ],
        },
        {
            id: 2,
            question: 'Investment Horizon',
            icon: '⏳',
            options: [
                { label: '10+ Years', score: 5 },
                { label: '5 - 10 Years', score: 4 },
                { label: '3 - 5 Years', score: 3 },
                { label: '0 - 3 Years', score: 1 },
            ],
        },
        {
            id: 3,
            question: 'Market Fall Reaction',
            icon: '📉',
            options: [
                { label: 'Invest More', score: 5 },
                { label: 'Stay Invested', score: 4 },
                { label: 'Wait', score: 2 },
                { label: 'Sell', score: 1 },
            ],
        },
        {
            id: 4,
            question: 'Investment Knowledge',
            icon: '🧠',
            options: [
                { label: 'Expert', score: 5 },
                { label: 'Good', score: 4 },
                { label: 'Basic', score: 2 },
                { label: 'Beginner', score: 1 },
            ],
        },
    ]

    const [answers, setAnswers] =
        useState({})

    const handleAnswer = (
        questionId,
        score
    ) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: score,
        }))
    }

    const answeredCount =
        Object.keys(answers).length

    const completion =
        (answeredCount /
            questions.length) *
        100

    const totalScore = useMemo(() => {
        return Object.values(answers).reduce(
            (acc, value) =>
                acc + value,
            0
        )
    }, [answers])

    const profile = useMemo(() => {

        if (totalScore >= 17) {
            return {
                title:
                    'Aggressive',
                color:
                    'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border:
                    'border-emerald-500/20',
                emoji: '🚀',
                description:
                    'High growth with higher volatility.',
                equity: '80%',
                debt: '20%',
                gold: '10%',
            }
        }

        if (totalScore >= 10) {
            return {
                title:
                    'Moderate',
                color:
                    'text-amber-400',
                bg: 'bg-amber-500/10',
                border:
                    'border-amber-500/20',
                emoji: '⚖️',
                description:
                    'Balanced growth and risk.',
                equity: '60%',
                debt: '30%',
                gold: '10%',
            }
        }

        return {
            title:
                'Conservative',
            color: 'text-sky-400',
            bg: 'bg-sky-500/10',
            border:
                'border-sky-500/20',
            emoji: '🛡️',
            description:
                'Capital safety and stability focused.',
            equity: '30%',
            debt: '60%',
            gold: '10%',
        }

    }, [totalScore])

    const radarData = [
        {
            subject: 'Risk',
            value: totalScore,
        },
        {
            subject: 'Growth',
            value:
                totalScore - 1,
        },
        {
            subject: 'Returns',
            value:
                totalScore - 2,
        },
        {
            subject: 'Patience',
            value: totalScore,
        },
        {
            subject: 'Stability',
            value:
                20 - totalScore,
        },
    ]

    const scoreData = [
        {
            name: 'Risk',
            value:
                (totalScore / 20) * 100,
            fill: '#10b981',
        },
    ]

    return (
        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

            <div className="grid xl:grid-cols-[390px_1fr]">

                {/* LEFT */}
                <div className="border-b border-slate-200 bg-slate-50/70 p-4 xl:border-b-0 xl:border-r">

                    {/* HEADER */}
                    <div className="mb-4">

                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-emerald-700">
                            🛡️ Risk Assessment
                        </div>

                        <h2 className="mt-3 text-xl font-bold text-slate-900">
                            Investor Risk Profiler
                        </h2>

                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            Discover your ideal investment strategy.
                        </p>

                    </div>

                    {/* PROGRESS */}
                    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3">

                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700">
                                Progress
                            </span>

                            <span className="text-xs font-bold text-emerald-600">
                                {answeredCount}/
                                {
                                    questions.length
                                }
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                style={{
                                    width: `${completion}%`,
                                }}
                            />
                        </div>

                    </div>

                    {/* QUESTIONS */}
                    <div className="space-y-3">

                        {questions.map(
                            (item) => (
                                <div
                                    key={
                                        item.id
                                    }
                                    className="rounded-2xl border border-slate-200 bg-white p-3"
                                >

                                    <div className="mb-3 flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                                            {
                                                item.icon
                                            }
                                        </div>

                                        <div>

                                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                                                Question{' '}
                                                {
                                                    item.id
                                                }
                                            </p>

                                            <h3 className="text-sm font-bold text-slate-800">
                                                {
                                                    item.question
                                                }
                                            </h3>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-2 gap-2">

                                        {item.options.map(
                                            (
                                                option,
                                                index
                                            ) => {

                                                const selected =
                                                    answers[
                                                    item
                                                        .id
                                                    ] ===
                                                    option.score

                                                return (
                                                    <button
                                                        key={
                                                            index
                                                        }
                                                        onClick={() =>
                                                            handleAnswer(
                                                                item.id,
                                                                option.score
                                                            )
                                                        }
                                                        className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${selected
                                                            ? 'border-emerald-500 bg-emerald-600 text-white'
                                                            : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50'
                                                            }`}
                                                    >

                                                        <div className="flex items-center justify-between">

                                                            <span className="text-xs font-semibold">
                                                                {
                                                                    option.label
                                                                }
                                                            </span>

                                                            <div
                                                                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${selected
                                                                    ? 'bg-white text-emerald-600'
                                                                    : 'bg-slate-200 text-slate-700'
                                                                    }`}
                                                            >
                                                                {
                                                                    option.score
                                                                }
                                                            </div>

                                                        </div>

                                                    </button>
                                                )
                                            }
                                        )}

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

                {/* RIGHT */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 text-white">

                    {/* TOP */}
                    <div className="mb-4 flex items-start justify-between">

                        <div>

                            <p className="text-xs text-slate-400">
                                Investor Profile
                            </p>

                            <h3
                                className={`mt-1 text-2xl font-black ${profile.color}`}
                            >
                                {
                                    profile.title
                                }
                            </h3>

                        </div>

                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl ${profile.bg} ${profile.border}`}
                        >
                            {profile.emoji}
                        </div>

                    </div>

                    {/* SCORE */}
                    <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                        <div className="grid gap-4 lg:grid-cols-[130px_1fr]">

                            {/* SCORE GRAPH */}
                            <div className="relative h-32">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <RadialBarChart
                                        innerRadius="72%"
                                        outerRadius="100%"
                                        data={
                                            scoreData
                                        }
                                        startAngle={
                                            90
                                        }
                                        endAngle={
                                            -270
                                        }
                                    >
                                        <RadialBar
                                            dataKey="value"
                                            cornerRadius={
                                                20
                                            }
                                        />
                                    </RadialBarChart>
                                </ResponsiveContainer>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">

                                    <h2 className="text-3xl font-black">
                                        {
                                            totalScore
                                        }
                                    </h2>

                                    <p className="text-xs text-slate-400">
                                        / 20
                                    </p>

                                </div>

                            </div>

                            {/* DETAILS */}
                            <div>

                                <p className="mb-2 text-[11px] uppercase tracking-widest text-emerald-300">
                                    Portfolio Behavior
                                </p>

                                <p className="text-sm leading-relaxed text-slate-300">
                                    {
                                        profile.description
                                    }
                                </p>

                                <div className="mt-4 grid grid-cols-3 gap-2">

                                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                        <p className="text-[10px] text-slate-400">
                                            Equity
                                        </p>

                                        <h4 className="mt-1 text-lg font-bold text-emerald-400">
                                            {
                                                profile.equity
                                            }
                                        </h4>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                        <p className="text-[10px] text-slate-400">
                                            Debt
                                        </p>

                                        <h4 className="mt-1 text-lg font-bold text-sky-400">
                                            {
                                                profile.debt
                                            }
                                        </h4>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                                        <p className="text-[10px] text-slate-400">
                                            Gold
                                        </p>

                                        <h4 className="mt-1 text-lg font-bold text-amber-400">
                                            {
                                                profile.gold
                                            }
                                        </h4>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RADAR */}
                    <div className="mt-4 rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                        <div className="mb-3">

                            <h4 className="text-lg font-bold">
                                Risk Analysis
                            </h4>

                            <p className="text-xs text-slate-400">
                                Investment behavior overview
                            </p>

                        </div>

                        <div className="h-[240px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <RadarChart
                                    data={radarData}
                                >

                                    <PolarGrid
                                        stroke="#334155"
                                    />

                                    <PolarAngleAxis
                                        dataKey="subject"
                                        stroke="#cbd5e1"
                                        tick={{
                                            fill: '#cbd5e1',
                                            fontSize: 11,
                                        }}
                                    />

                                    <PolarRadiusAxis
                                        stroke="#475569"
                                        tick={{
                                            fill: '#64748b',
                                            fontSize: 10,
                                        }}
                                    />

                                    <Radar
                                        name="Profile"
                                        dataKey="value"
                                        stroke="#10b981"
                                        fill="#10b981"
                                        fillOpacity={
                                            0.45
                                        }
                                        strokeWidth={
                                            2
                                        }
                                    />

                                </RadarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* STRATEGY */}
                    <div className="mt-4 rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-4">

                        <div className="flex items-start gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-xl">
                                💡
                            </div>

                            <div>

                                <h4 className="text-base font-bold text-white">
                                    Suggested Strategy
                                </h4>

                                <p className="mt-1 text-sm leading-relaxed text-emerald-100">
                                    {totalScore >= 17
                                        ? 'Focus on long-term equity and growth-oriented investments.'
                                        : totalScore >= 10
                                            ? 'Maintain balanced allocation with periodic rebalancing.'
                                            : 'Focus on capital safety with stable investment products.'}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}