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
import { mockKPIs, mockAlerts, mockNextActions } from '@/lib/mockData'

export function HomePage() {
  return (
    <VStack spacing={4} align="stretch">
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

      {/* Alerts & Next Actions */}
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
    </VStack>
  )
}