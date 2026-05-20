import { useState } from 'react'

import Navbar from './components/Navbar'
import SIPCalculator from './components/SIPCalculator'
import GoalPlanner from './components/GoalPlanner'
import RiskProfiler from './components/RiskProfiler'
import PortfolioAnalyzer from './components/PortfolioAnalyzer'

const tabs = [
  {
    id: 'sip',
    label: 'SIP Calculator',
    icon: '📈',
    desc: 'Calculate future wealth growth',
  },
  {
    id: 'goal',
    label: 'Goal Planner',
    icon: '🎯',
    desc: 'Plan financial goals smartly',
  },
  {
    id: 'risk',
    label: 'Risk Profiler',
    icon: '🛡️',
    desc: 'Discover your investor type',
  },
  {
    id: 'portfolio',
    label: 'Portfolio Analyzer',
    icon: '📊',
    desc: 'Analyze asset allocation',
  },
]

export default function App() {
  const [activeTab, setActiveTab] =
    useState('sip')

  const renderComponent = () => {
    switch (activeTab) {
      case 'sip':
        return <SIPCalculator />

      case 'goal':
        return <GoalPlanner />

      case 'risk':
        return <RiskProfiler />

      case 'portfolio':
        return <PortfolioAnalyzer />

      default:
        return <SIPCalculator />
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-[1600px] px-4 py-5">

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-24 h-fit">

            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

              {/* HEADER */}


              {/* NAVIGATION */}
              <div className="p-3 space-y-3">

                {tabs.map((tab) => {
                  const active =
                    activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setActiveTab(tab.id)
                      }
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${active
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-100'
                        : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50'
                        }`}
                    >

                      <div className="flex items-center gap-4">

                        {/* ICON */}
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${active
                            ? 'bg-white/15'
                            : 'bg-slate-100'
                            }`}
                        >
                          {tab.icon}
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">

                          <h3
                            className={`font-bold ${active
                              ? 'text-white'
                              : 'text-slate-900'
                              }`}
                          >
                            {tab.label}
                          </h3>

                          <p
                            className={`mt-1 text-sm ${active
                              ? 'text-emerald-100'
                              : 'text-slate-500'
                              }`}
                          >
                            {tab.desc}
                          </p>

                        </div>

                      </div>

                    </button>
                  )
                })}

              </div>




            </div>

          </aside>

          {/* MAIN CONTENT */}
          <main>
            {renderComponent()}
          </main>

        </div>

      </div>
    </div>
  )
}