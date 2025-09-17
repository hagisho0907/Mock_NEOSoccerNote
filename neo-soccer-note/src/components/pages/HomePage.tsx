'use client'

import {
  Grid,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  AspectRatio,
  Center,
  Badge,
  OrderedList,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockKPIs, mockAlerts, mockNextActions, mockTabSummary } from '@/lib/mockData'

const StatsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"/>
  </svg>
)

const MedicalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

const LifelogIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const NoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
)

const BuddyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V5.5C15 4.5 14.5 4 13.5 4H10.5C9.5 4 9 4.5 9 5.5V5.5L3 7V9H5V14.5C5 15.1 5.4 15.5 6 15.5H9V22H11V15.5H13V22H15V15.5H18C18.6 15.5 19 15.1 19 14.5V9H21Z"/>
  </svg>
)

interface TabSummaryCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  onClick: () => void
  badge?: string
  color?: string
}

function TabSummaryCard({ title, icon, children, onClick, badge, color = "brand" }: TabSummaryCardProps) {
  return (
    <Card 
      title={
        <HStack spacing={2}>
          <Box color={`${color}.500`}>{icon}</Box>
          <Text>{title}</Text>
        </HStack>
      }
      rightElement={badge ? (
        <Badge colorScheme={color} variant="subtle" size="sm">
          {badge}
        </Badge>
      ) : undefined}
    >
      <Box
        cursor="pointer"
        onClick={onClick}
        _hover={{ bg: "gray.50" }}
        rounded="md"
        p={2}
        transition="all 0.2s"
      >
        {children}
      </Box>
    </Card>
  )
}

interface HomePageProps {
  onTabChange?: (tab: string) => void
}

export function HomePage({ onTabChange }: HomePageProps) {
  const handleTabNavigation = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* KPI Strip */}
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
        {mockKPIs.map((kpi) => (
          <Box
            key={kpi.label}
            bg="white"
            rounded="2xl"
            p={4}
            border="1px"
            borderColor="gray.200"
            shadow="sm"
          >
            <Text fontSize="xs" color="gray.500" mb={1}>
              {kpi.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {kpi.value}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              {kpi.subtext}
            </Text>
          </Box>
        ))}
      </Grid>

      {/* カテゴリ別タブサマリ */}
      
      {/* パフォーマンス */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          🏃‍♂️ パフォーマンス
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <TabSummaryCard
            title="Stats"
            icon={<StatsIcon />}
            onClick={() => handleTabNavigation('stats')}
            badge={`評価${mockTabSummary.stats.latestRating}`}
            color="blue"
          >
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">最新:</Text>
                <Text fontSize="sm" fontWeight="medium">{mockTabSummary.stats.latestSession}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">今週:</Text>
                <Text fontSize="sm">{mockTabSummary.stats.weeklyActivity}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">動画:</Text>
                <Text fontSize="sm" color="blue.600">{mockTabSummary.stats.videoStatus}</Text>
              </HStack>
            </VStack>
          </TabSummaryCard>

          <TabSummaryCard
            title="Medical"
            icon={<MedicalIcon />}
            onClick={() => handleTabNavigation('medical')}
            badge={mockTabSummary.medical.latestScreening}
            color="red"
          >
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="medium" color="red.600">
                {mockTabSummary.medical.rehabStatus}
              </Text>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">リスク:</Text>
                <Text fontSize="sm" color="orange.600">{mockTabSummary.medical.risks}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">次回検査:</Text>
                <Text fontSize="sm">{mockTabSummary.medical.nextCheckup}</Text>
              </HStack>
            </VStack>
          </TabSummaryCard>
        </Grid>
      </Box>

      {/* ライフスタイル */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          🌱 ライフスタイル
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <TabSummaryCard
            title="Lifelog"
            icon={<LifelogIcon />}
            onClick={() => handleTabNavigation('lifelog')}
            badge={mockTabSummary.lifelog.deviceStatus}
            color="green"
          >
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">睡眠:</Text>
                <Text fontSize="sm" fontWeight="medium" color="green.600">{mockTabSummary.lifelog.sleepScore}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">栄養:</Text>
                <Text fontSize="sm">{mockTabSummary.lifelog.nutrition}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">運動:</Text>
                <Text fontSize="sm" color="blue.600">{mockTabSummary.lifelog.exercise}</Text>
              </HStack>
            </VStack>
          </TabSummaryCard>

          <TabSummaryCard
            title="Note"
            icon={<NoteIcon />}
            onClick={() => handleTabNavigation('note')}
            badge={`${mockTabSummary.note.pendingTasks}件`}
            color="purple"
          >
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="medium" color="purple.600">
                {mockTabSummary.note.todayMemo}
              </Text>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">未完了タスク:</Text>
                <Text fontSize="sm" color="orange.600">{mockTabSummary.note.pendingTasks}件</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">期限迫る:</Text>
                <Text fontSize="sm" color="red.600">{mockTabSummary.note.urgentDeadlines}件</Text>
              </HStack>
            </VStack>
          </TabSummaryCard>
        </Grid>
      </Box>

      {/* サポート機能 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          🤝 サポート機能
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={4}>
          <TabSummaryCard
            title="Buddy"
            icon={<BuddyIcon />}
            onClick={() => handleTabNavigation('buddy')}
            badge={`${mockTabSummary.buddy.generatedTodos}件ToDo`}
            color="teal"
          >
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">前回相談:</Text>
                <Text fontSize="sm" fontWeight="medium">{mockTabSummary.buddy.lastConsultation}</Text>
              </HStack>
              <Text fontSize="sm" color="teal.600" fontStyle="italic">
                💡 {mockTabSummary.buddy.keyAdvice}
              </Text>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">次回推奨:</Text>
                <Text fontSize="sm" color="blue.600">{mockTabSummary.buddy.nextRecommendedArea}</Text>
              </HStack>
            </VStack>
          </TabSummaryCard>
        </Grid>
      </Box>

      {/* システム情報 (既存の要素) */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          ⚡ システム情報
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <Card title="アラート">
            <UnorderedList fontSize="sm" spacing={2} color="gray.700">
              {mockAlerts.map((alert, index) => (
                <ListItem key={index}>{alert}</ListItem>
              ))}
            </UnorderedList>
          </Card>

          <Card 
            title="次アクション" 
            rightElement={
              <Badge colorScheme="brand" variant="subtle" fontSize="xs">
                今日1つ/今週3つ
              </Badge>
            }
          >
            <OrderedList fontSize="sm" spacing={1} color="gray.700">
              {mockNextActions.map((action, index) => (
                <ListItem key={index}>{action}</ListItem>
              ))}
            </OrderedList>
          </Card>

          <Card title="最新動画">
            <VStack spacing={3}>
              <AspectRatio ratio={16/9} w="full">
                <Center bg="gray.100" rounded="xl" color="gray.500">
                  動画プレビュー
                </Center>
              </AspectRatio>
              <HStack justify="space-between" w="full">
                <Text fontSize="xs" color="gray.500">
                  vs Seaside U18 (9/15) — 02:14〜 プレス→得点
                </Text>
                <Button size="xs" colorScheme="gray" variant="solid">
                  ハイライト生成
                </Button>
              </HStack>
            </VStack>
          </Card>
        </Grid>
      </Box>
    </VStack>
  )
}