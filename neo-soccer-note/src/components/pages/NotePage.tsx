'use client'

import {
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  SimpleGrid,
  Box,
  Input,
  FormControl
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockTasks } from '@/lib/mockData'

export function NotePage() {
  const weekDays = ['月', '火', '水', '木', '金', '土', '日']
  
  const reflectionFields = [
    '① 目標',
    '② 実行', 
    '③ 結果',
    '④ 気づき',
    '⑤ 次アクション'
  ]

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      <Card title="週カレンダー(例)">
        <SimpleGrid columns={7} spacing={2}>
          {weekDays.map((day) => (
            <Box
              key={day}
              p={2}
              rounded="md"
              border="1px"
              borderColor="gray.200"
              minH="80px"
              fontSize="xs"
            >
              <Text color="gray.500" mb={1} fontWeight="medium">
                {day}
              </Text>
              <Text color="gray.700" mb={1}>
                • 夕方 練習
              </Text>
              <Text color="brand.600">
                • 目標: プレス開始位置
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Card>

      <Card title="課題/タスク">
        <VStack spacing={3}>
          <VStack spacing={2} w="full">
            {mockTasks.map((task) => (
              <HStack
                key={task.id}
                justify="space-between"
                w="full"
                p={2}
                rounded="md"
                bg={task.completed ? "gray.50" : "white"}
                opacity={task.completed ? 0.7 : 1}
              >
                <Text fontSize="sm" flex={1} textDecoration={task.completed ? "line-through" : "none"}>
                  {task.title}
                </Text>
                <Badge
                  colorScheme={
                    task.priority === 'high' ? 'red' : 
                    task.priority === 'medium' ? 'orange' : 'gray'
                  }
                  variant="subtle"
                  fontSize="xs"
                >
                  期限 {task.deadline.slice(5)}
                </Badge>
              </HStack>
            ))}
          </VStack>
          
          <HStack spacing={2} w="full">
            <Button colorScheme="brand" size="sm" flex={1}>
              追加
            </Button>
            <Button variant="outline" size="sm" flex={1}>
              テンプレ
            </Button>
          </HStack>
        </VStack>
      </Card>

      <Card title="振り返りテンプレ(5行)">
        <VStack spacing={3}>
          {reflectionFields.map((field) => (
            <FormControl key={field}>
              <Input
                placeholder={field}
                size="sm"
                fontSize="sm"
              />
            </FormControl>
          ))}
          <Button colorScheme="brand" size="sm" w="full">
            保存
          </Button>
        </VStack>
      </Card>
    </Grid>
  )
}