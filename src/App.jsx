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
  },
  {
    id: 'goal',
    label: 'Goal Planner',
    icon: '🎯',
  },
  {
    id: 'risk',
    label: 'Risk Profiler',
    icon: '🛡️',
  },
  {
    id: 'portfolio',
    label: 'Portfolio Analyzer',
    icon: '📊',
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            Financial Planning Suite
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Smart Financial Tools
          </h1>

          <p className="text-slate-500 max-w-3xl leading-relaxed text-lg">
            Plan investments, analyze portfolios,
            discover your risk appetite, and achieve
            your financial goals with YS Capital's
            intelligent planning tools.
          </p>
        </div>

        {/* HORIZONTAL TABS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-sm mb-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {tabs.map((tab) => {
              const isActive =
                activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap ${isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <span className="text-xl">
                    {tab.icon}
                  </span>

                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ACTIVE COMPONENT */}
        <div className="animate-fadeIn">
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}