import { useMemo, useState } from 'react'
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from 'recharts'

export default function RiskProfiler() {
    const questions = [
        {
            id: 1,
            question: 'What is your age group?',
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
            options: [
                { label: '10+ Years', score: 5 },
                { label: '5 - 10 Years', score: 4 },
                { label: '3 - 5 Years', score: 3 },
                { label: '0 - 3 Years', score: 1 },
            ],
        },
        {
            id: 3,
            question: 'Reaction to Market Fall',
            options: [
                { label: 'Invest More', score: 5 },
                { label: 'Stay Invested', score: 4 },
                { label: 'Wait & Watch', score: 2 },
                { label: 'Sell Investments', score: 1 },
            ],
        },
        {
            id: 4,
            question: 'Investment Knowledge',
            options: [
                { label: 'Expert', score: 5 },
                { label: 'Good', score: 4 },
                { label: 'Basic', score: 2 },
                { label: 'Beginner', score: 1 },
            ],
        },
    ]

    const [answers, setAnswers] = useState({})

    const handleAnswer = (questionId, score) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: score,
        }))
    }

    const totalScore = useMemo(() => {
        return Object.values(answers).reduce(
            (acc, value) => acc + value,
            0
        )
    }, [answers])

    const profile = useMemo(() => {
        if (totalScore >= 17) {
            return {
                title: 'Aggressive Investor',
                color: 'text-emerald-400',
                description:
                    'You are comfortable taking higher risks for potentially higher returns.',
            }
        }

        if (totalScore >= 10) {
            return {
                title: 'Moderate Investor',
                color: 'text-yellow-400',
                description:
                    'You prefer balanced growth with moderate risk exposure.',
            }
        }

        return {
            title: 'Conservative Investor',
            color: 'text-sky-400',
            description:
                'You prioritize capital safety and stable returns.',
        }
    }, [totalScore])

    const radarData = [
        {
            subject: 'Risk',
            value: totalScore,
        },
        {
            subject: 'Growth',
            value: totalScore - 2,
        },
        {
            subject: 'Stability',
            value: 20 - totalScore,
        },
        {
            subject: 'Returns',
            value: totalScore - 1,
        },
        {
            subject: 'Patience',
            value: totalScore,
        },
    ]

    return (
        <section className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="p-8 lg:p-10">
                    <div className="mb-10">
                        <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Risk Assessment
                        </div>

                        <h2 className="text-4xl font-bold text-slate-900 mb-3">
                            Risk Profiler
                        </h2>

                        <p className="text-slate-500 leading-relaxed">
                            Discover your investment personality and
                            understand the right portfolio strategy for
                            your financial goals.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {questions.map((item) => (
                            <div
                                key={item.id}
                                className="border border-slate-200 rounded-3xl p-6"
                            >
                                <h3 className="text-lg font-semibold text-slate-800 mb-5">
                                    {item.question}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {item.options.map((option, index) => {
                                        const selected =
                                            answers[item.id] === option.score

                                        return (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    handleAnswer(
                                                        item.id,
                                                        option.score
                                                    )
                                                }
                                                className={`rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${selected
                                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                                        : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white p-8 lg:p-10 flex flex-col justify-between">
                    {/* PROFILE */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-slate-400 mb-2">
                                    Investor Profile
                                </p>

                                <h3
                                    className={`text-4xl font-bold ${profile.color}`}
                                >
                                    {profile.title}
                                </h3>
                            </div>

                            <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-4xl">
                                🛡️
                            </div>
                        </div>

                        {/* SCORE CARD */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-8">
                            <p className="text-slate-400 mb-3">
                                Risk Score
                            </p>

                            <div className="flex items-end gap-3 mb-4">
                                <h2 className="text-6xl font-bold text-emerald-400">
                                    {totalScore}
                                </h2>

                                <span className="text-slate-400 text-lg mb-2">
                                    / 20
                                </span>
                            </div>

                            <p className="text-slate-300 leading-relaxed">
                                {profile.description}
                            </p>
                        </div>

                        {/* RECOMMENDATION */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                                <p className="text-slate-400 text-sm mb-2">
                                    Equity Allocation
                                </p>

                                <h4 className="text-3xl font-bold text-emerald-400">
                                    {totalScore >= 17
                                        ? '80%'
                                        : totalScore >= 10
                                            ? '60%'
                                            : '30%'}
                                </h4>
                            </div>

                            <div className="bg-white/10 rounded-2xl border border-white/10 p-5">
                                <p className="text-slate-400 text-sm mb-2">
                                    Debt Allocation
                                </p>

                                <h4 className="text-3xl font-bold text-sky-400">
                                    {totalScore >= 17
                                        ? '20%'
                                        : totalScore >= 10
                                            ? '40%'
                                            : '70%'}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* RADAR CHART */}
                    <div className="mt-10">
                        <div className="mb-4">
                            <h4 className="text-xl font-semibold">
                                Risk Analysis
                            </h4>

                            <p className="text-slate-400 text-sm">
                                Visual representation of your investment
                                behavior.
                            </p>
                        </div>

                        <div className="h-80">
                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="#475569" />

                                    <PolarAngleAxis
                                        dataKey="subject"
                                        stroke="#cbd5e1"
                                    />

                                    <PolarRadiusAxis
                                        stroke="#64748b"
                                    />

                                    <Radar
                                        name="Risk"
                                        dataKey="value"
                                        stroke="#10b981"
                                        fill="#10b981"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}