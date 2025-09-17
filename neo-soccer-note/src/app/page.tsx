'use client'

import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/components/pages/HomePage'
import { StatsPage } from '@/components/pages/StatsPage'
import { LifelogPage } from '@/components/pages/LifelogPage'
import { MedicalPage } from '@/components/pages/MedicalPage'
import { NotePage } from '@/components/pages/NotePage'
import { BuddyPage } from '@/components/pages/BuddyPage'
import { SupportPage } from '@/components/pages/SupportPage'
import { SettingsPage } from '@/components/pages/SettingsPage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onTabChange={setActiveTab} />
      case 'stats':
        return <StatsPage />
      case 'lifelog':
        return <LifelogPage />
      case 'medical':
        return <MedicalPage />
      case 'note':
        return <NotePage />
      case 'buddy':
        return <BuddyPage />
      case 'support':
        return <SupportPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage onTabChange={setActiveTab} />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  )
}
