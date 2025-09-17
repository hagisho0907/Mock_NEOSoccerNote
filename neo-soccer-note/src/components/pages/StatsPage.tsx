'use client'

import {
  Grid,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  Text,
  Badge,
  Box
} from '@chakra-ui/react'
import { Card } from '../Card'
import { useState } from 'react'

export function StatsPage() {
  const [sessionForm, setSessionForm] = useState({
    type: 'match',
    date: '',
    opponent: '',
    playTime: '',
    formation: '',
    position: ''
  })

  const eventTypes = [
    'パス(進行)',
    'クロス', 
    'シュート(部位/枠内)',
    'デュエル',
    'プレス',
    'インターセプト'
  ]

  const highlightRecipes = [
    { name: '高位置奪取→ショートカウンター→シュート', active: true },
    { name: '左ハーフスペース侵入→スルーパス', active: false }
  ]

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      <Card title="セッション登録">
        <VStack spacing={3}>
          <SimpleGrid columns={2} spacing={3} w="full">
            <FormControl>
              <FormLabel fontSize="sm">種別</FormLabel>
              <Select 
                size="sm"
                value={sessionForm.type}
                onChange={(e) => setSessionForm({...sessionForm, type: e.target.value})}
              >
                <option value="match">試合</option>
                <option value="training">練習</option>
                <option value="self_training">自主練</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">日付</FormLabel>
              <Input 
                type="date" 
                size="sm"
                value={sessionForm.date}
                onChange={(e) => setSessionForm({...sessionForm, date: e.target.value})}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel fontSize="sm">対戦相手 / 会場</FormLabel>
            <Input 
              placeholder="例: FC North @ 市営G" 
              size="sm"
              value={sessionForm.opponent}
              onChange={(e) => setSessionForm({...sessionForm, opponent: e.target.value})}
            />
          </FormControl>

          <SimpleGrid columns={2} spacing={3} w="full">
            <FormControl>
              <FormLabel fontSize="sm">出場(分)</FormLabel>
              <Input 
                type="number" 
                placeholder="75" 
                size="sm"
                value={sessionForm.playTime}
                onChange={(e) => setSessionForm({...sessionForm, playTime: e.target.value})}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">フォーメーション</FormLabel>
              <Input 
                placeholder="4-3-3" 
                size="sm"
                value={sessionForm.formation}
                onChange={(e) => setSessionForm({...sessionForm, formation: e.target.value})}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel fontSize="sm">ポジション履歴</FormLabel>
            <Input 
              placeholder="0-30 LWG / 30-90 CM" 
              size="sm"
              value={sessionForm.position}
              onChange={(e) => setSessionForm({...sessionForm, position: e.target.value})}
            />
          </FormControl>

          <HStack spacing={2} w="full">
            <Button colorScheme="brand" size="sm" flex={1}>
              保存
            </Button>
            <Button variant="outline" size="sm" flex={1}>
              動画を添付
            </Button>
          </HStack>
        </VStack>
      </Card>

      <Card 
        title="イベントタグ(最小)" 
        rightElement={
          <Badge colorScheme="gray" variant="subtle" fontSize="xs">
            xGは座標あり時
          </Badge>
        }
      >
        <VStack spacing={3}>
          <SimpleGrid columns={2} spacing={2} w="full">
            {eventTypes.map((eventType) => (
              <Button
                key={eventType}
                variant="outline"
                size="sm"
                textAlign="left"
                justifyContent="flex-start"
                h="auto"
                p={2}
                whiteSpace="normal"
                fontSize="sm"
              >
                {eventType}
              </Button>
            ))}
          </SimpleGrid>
          
          <Box
            p={2}
            rounded="md"
            bg="gray.50"
            w="full"
          >
            <Text fontSize="xs" color="gray.600">
              + 座標入力でシュートマップ/ヒートマップを強化
            </Text>
          </Box>
        </VStack>
      </Card>

      <Card title="ハイライト自動生成">
        <VStack spacing={2}>
          {highlightRecipes.map((recipe, index) => (
            <HStack key={index} justify="space-between" w="full">
              <Text fontSize="sm" flex={1}>
                {recipe.name}
              </Text>
              <Button
                size="sm"
                colorScheme={recipe.active ? "brand" : "gray"}
                variant={recipe.active ? "solid" : "outline"}
              >
                生成
              </Button>
            </HStack>
          ))}
        </VStack>
      </Card>
    </Grid>
  )
}