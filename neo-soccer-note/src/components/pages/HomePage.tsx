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
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockKPIs, mockAlerts, mockTasks, mockVideoClips } from '@/lib/mockData'


interface HomePageProps {
  onTabChange?: (tab: string) => void
}

export function HomePage({ onTabChange: _onTabChange }: HomePageProps) {

  const statsKPIs = mockKPIs.slice(0, 4) // Stats Page Data
  const lifelogKPIs = mockKPIs.slice(4, 8) // Lifelog Page Data  
  const medicalKPIs = mockKPIs.slice(8, 12) // Medical Page Data
  const sessionKPIs = mockKPIs.slice(12, 14) // Session Data

  const KPICard = ({ kpi, colorScheme = "gray" }: { kpi: { label: string; value: string; subtext: string }, colorScheme?: string }) => (
    <Box
      bg="white"
      rounded="xl"
      p={4}
      border="1px"
      borderColor="gray.200"
      shadow="sm"
      _hover={{ shadow: "md", borderColor: `${colorScheme}.300` }}
      transition="all 0.2s"
    >
      <Text fontSize="xs" color="gray.500" mb={1} noOfLines={1}>
        {kpi.label}
      </Text>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" noOfLines={1}>
        {kpi.value}
      </Text>
      <Text fontSize="xs" color="gray.500" mt={1} noOfLines={1}>
        {kpi.subtext}
      </Text>
    </Box>
  )

  return (
    <VStack spacing={8} align="stretch">
      {/* Stats - パフォーマンス指標 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="blue.700" mb={4}>
          ⚽ パフォーマンス指標
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
          {statsKPIs.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} colorScheme="blue" />
          ))}
        </Grid>
      </Box>

      {/* Lifelog - ライフスタイル指標 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="green.700" mb={4}>
          🌱 ライフスタイル指標
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
          {lifelogKPIs.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} colorScheme="green" />
          ))}
        </Grid>
      </Box>

      {/* Medical - メディカル指標 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="red.700" mb={4}>
          🏥 メディカル指標
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
          {medicalKPIs.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} colorScheme="red" />
          ))}
        </Grid>
      </Box>

      {/* Session - 活動指標 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="purple.700" mb={4}>
          📈 活動指標
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }} gap={4}>
          {sessionKPIs.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} colorScheme="purple" />
          ))}
        </Grid>
      </Box>

      {/* その他データ */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          ⚡ その他データ
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          {/* アラート */}
          <Card title="アラート" rightElement={
            <Badge colorScheme="red" variant="subtle" size="sm">
              {mockAlerts.length}件
            </Badge>
          }>
            <UnorderedList fontSize="sm" spacing={2} color="gray.700">
              {mockAlerts.map((alert, index) => (
                <ListItem key={index} color="red.600">
                  {alert}
                </ListItem>
              ))}
            </UnorderedList>
          </Card>

          {/* ネクストアクション */}
          <Card title="ネクストアクション" rightElement={
            <Badge colorScheme="orange" variant="subtle" size="sm">
              {mockTasks.filter(task => !task.completed).length}件
            </Badge>
          }>
            <VStack spacing={2} align="stretch">
              {mockTasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                <Box key={task.id} p={2} bg="orange.50" rounded="md">
                  <HStack justify="space-between">
                    <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                      {task.title}
                    </Text>
                    <Badge 
                      size="xs" 
                      colorScheme={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'gray'}
                    >
                      {task.priority}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.600">
                    期限: {new Date(task.deadline).toLocaleDateString('ja-JP')}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Card>

          {/* 最新動画 */}
          <Card title="最新動画" rightElement={
            <Badge colorScheme="blue" variant="subtle" size="sm">
              {mockVideoClips.length}本
            </Badge>
          }>
            <VStack spacing={3}>
              <AspectRatio ratio={16/9} w="full">
                <Center bg="gray.100" rounded="xl" color="gray.500">
                  <VStack spacing={2}>
                    <Text fontSize="xs">動画プレビュー</Text>
                    <Text fontSize="xs" fontWeight="bold">
                      {mockVideoClips[0]?.title || "動画なし"}
                    </Text>
                  </VStack>
                </Center>
              </AspectRatio>
              <VStack spacing={1} w="full">
                <Text fontSize="xs" color="gray.600" noOfLines={1}>
                  {mockVideoClips[0]?.title || "動画が登録されていません"}
                </Text>
                <HStack justify="space-between" w="full">
                  <Text fontSize="xs" color="gray.500">
                    {mockVideoClips[0]?.duration ? `${Math.floor(mockVideoClips[0].duration / 60)}:${(mockVideoClips[0].duration % 60).toString().padStart(2, '0')}` : "--:--"}
                  </Text>
                  <Button size="xs" colorScheme="blue" variant="outline">
                    再生
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </Card>
        </Grid>
      </Box>
    </VStack>
  )
}