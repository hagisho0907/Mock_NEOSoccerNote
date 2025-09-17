'use client'

import {
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockIntegrations, Integration } from '@/lib/mockData'
import { useState } from 'react'

// アイコン用のシンプルなSVGアイコン
const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
  </svg>
)

const WearableIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16.01 14 12l4-4-.01-.01H18V2H6zm5 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
)

const SmartphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 20c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5S12.83 22 12 22z"/>
  </svg>
)

const MedicalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 6h5v2h2V6h1V4H4v2zm0 5h3v2h2v-2h3V9H4v2zm0 5h5v2h2v-2h1v-2H4v2z"/>
  </svg>
)

interface IntegrationCardProps {
  integration: Integration
  onConnect: (id: string) => void
  onDisconnect: (id: string) => void
}

function IntegrationCard({ integration, onConnect, onDisconnect }: IntegrationCardProps) {
  const getIcon = () => {
    switch (integration.type) {
      case 'video': return <VideoIcon />
      case 'wearable': return <WearableIcon />
      case 'smartphone': return <SmartphoneIcon />
      case 'medical': return <MedicalIcon />
    }
  }

  const getStatusColor = () => {
    switch (integration.status) {
      case 'connected': return 'green'
      case 'pending': return 'yellow'
      case 'disconnected': return 'gray'
    }
  }

  const getStatusText = () => {
    switch (integration.status) {
      case 'connected': return '接続済み'
      case 'pending': return '設定中'
      case 'disconnected': return '未接続'
    }
  }

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.200"
      rounded="xl"
      bg="white"
      shadow="sm"
    >
      <HStack justify="space-between" mb={3}>
        <HStack spacing={3}>
          <Box color="gray.600">
            {getIcon()}
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="medium" fontSize="sm">
              {integration.name}
            </Text>
            {integration.accountInfo && (
              <Text fontSize="xs" color="gray.500">
                {integration.accountInfo}
              </Text>
            )}
          </VStack>
        </HStack>
        <Badge colorScheme={getStatusColor()} variant="subtle" fontSize="xs">
          {getStatusText()}
        </Badge>
      </HStack>

      {integration.lastSync && (
        <Text fontSize="xs" color="gray.500" mb={3}>
          最終同期: {integration.lastSync}
        </Text>
      )}

      <HStack spacing={2}>
        {integration.status === 'connected' ? (
          <>
            <Button
              size="sm"
              variant="outline"
              colorScheme="red"
              onClick={() => onDisconnect(integration.id)}
              flex={1}
            >
              連携解除
            </Button>
            <Button size="sm" variant="outline" flex={1}>
              設定
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            colorScheme="brand"
            onClick={() => onConnect(integration.id)}
            isLoading={integration.status === 'pending'}
            loadingText="設定中..."
            w="full"
          >
            {integration.status === 'pending' ? '設定中...' : '連携する'}
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export function SettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations)

  const handleConnect = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'pending' as const }
          : integration
      )
    )
    
    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === id 
            ? { 
                ...integration, 
                status: 'connected' as const,
                lastSync: new Date().toLocaleString('ja-JP'),
                accountInfo: integration.accountInfo || 'user@example.com'
              }
            : integration
        )
      )
    }, 2000)
  }

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'disconnected' as const, lastSync: undefined }
          : integration
      )
    )
  }

  const getIntegrationsByType = (type: Integration['type']) => {
    return integrations.filter(integration => integration.type === type)
  }

  const getConnectedCount = (type: Integration['type']) => {
    return integrations.filter(integration => integration.type === type && integration.status === 'connected').length
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Overview Alert */}
      <Alert status="info" rounded="lg">
        <AlertIcon />
        <Box>
          <AlertTitle fontSize="sm">データ連携について</AlertTitle>
          <AlertDescription fontSize="sm">
            外部サービスとの連携により、自動的にデータが収集され、より精度の高い分析とアドバイスが可能になります。
          </AlertDescription>
        </Box>
      </Alert>

      {/* Video Integration */}
      <Card 
        title="映像連携" 
        rightElement={
          <Badge colorScheme="blue" variant="subtle" fontSize="xs">
            {getConnectedCount('video')}/2 接続中
          </Badge>
        }
      >
        <VStack spacing={3} align="stretch">
          <Text fontSize="sm" color="gray.600">
            試合・練習映像の自動取得とハイライト生成
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {getIntegrationsByType('video').map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </Grid>
        </VStack>
      </Card>

      {/* Wearable Integration */}
      <Card 
        title="ウェアラブルデバイス連携"
        rightElement={
          <Badge colorScheme="green" variant="subtle" fontSize="xs">
            {getConnectedCount('wearable')}/3 接続中
          </Badge>
        }
      >
        <VStack spacing={3} align="stretch">
          <Text fontSize="sm" color="gray.600">
            睡眠、心拍、トレーニング負荷の自動記録
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {getIntegrationsByType('wearable').map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </Grid>
        </VStack>
      </Card>

      {/* Smartphone Integration */}
      <Card 
        title="スマートフォン連携"
        rightElement={
          <Badge colorScheme="purple" variant="subtle" fontSize="xs">
            {getConnectedCount('smartphone')}/2 接続中
          </Badge>
        }
      >
        <VStack spacing={3} align="stretch">
          <Text fontSize="sm" color="gray.600">
            歩数、移動距離、基本的な健康データの取得
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {getIntegrationsByType('smartphone').map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </Grid>
        </VStack>
      </Card>

      {/* Medical Integration */}
      <Card 
        title="メディカル連携"
        rightElement={
          <Badge colorScheme="red" variant="subtle" fontSize="xs">
            {getConnectedCount('medical')}/3 接続中
          </Badge>
        }
      >
        <VStack spacing={3} align="stretch">
          <Text fontSize="sm" color="gray.600">
            体組成、血液検査、遺伝子検査結果との連携
          </Text>
          <Alert status="warning" size="sm" rounded="md">
            <AlertIcon />
            <AlertDescription fontSize="xs">
              医療データの連携には患者本人または保護者の同意が必要です
            </AlertDescription>
          </Alert>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {getIntegrationsByType('medical').map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
              />
            ))}
          </Grid>
        </VStack>
      </Card>
    </VStack>
  )
}