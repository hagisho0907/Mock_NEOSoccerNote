'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/components/pages/HomePage'
import { StatsPage } from '@/components/pages/StatsPage'
import { NotePage } from '@/components/pages/NotePage'
import { BuddyPage } from '@/components/pages/BuddyPage'
import { SupportPage } from '@/components/pages/SupportPage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'stats':
        return <StatsPage />
      case 'note':
        return <NotePage />
      case 'buddy':
        return <BuddyPage />
      case 'support':
        return <SupportPage />
      default:
        return <HomePage />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  )
}
