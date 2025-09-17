'use client'

import {
  Grid,
  Box,
  Text,
  VStack
} from '@chakra-ui/react'
import { mockKPIs } from '@/lib/mockData'


interface HomePageProps {
  onTabChange?: (tab: string) => void
}

export function HomePage({ onTabChange }: HomePageProps) {

  return (
    <VStack spacing={6} align="stretch">
      {/* 全データKPI表示 */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          📊 総合データ概覧
        </Text>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(7, 1fr)" }} gap={3}>
          {mockKPIs.map((kpi) => (
            <Box
              key={kpi.label}
              bg="white"
              rounded="xl"
              p={3}
              border="1px"
              borderColor="gray.200"
              shadow="sm"
              _hover={{ shadow: "md", borderColor: "brand.300" }}
              transition="all 0.2s"
            >
              <Text fontSize="xs" color="gray.500" mb={1} noOfLines={1}>
                {kpi.label}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="gray.800" noOfLines={1}>
                {kpi.value}
              </Text>
              <Text fontSize="xs" color="gray.500" mt={1} noOfLines={1}>
                {kpi.subtext}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </VStack>
  )
}