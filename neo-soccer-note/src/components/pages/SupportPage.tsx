'use client'

import {
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Checkbox,
  Flex,
  Badge,
  Box
} from '@chakra-ui/react'
import { Card } from '../Card'
import { useState } from 'react'

export function SupportPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [permissions, setPermissions] = useState({
    timeLimited: false,
    downloadDisabled: false,
    personalInfoMasked: false
  })
  
  const templates = ['スカウト', '学校', 'スポンサー']

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      <Card title="パスポート生成">
        <VStack spacing={3}>
          <Box w="full">
            <Text fontSize="sm" mb={2} color="gray.700">
              相手別テンプレート:
            </Text>
            <Flex gap={2} wrap="wrap">
              {templates.map((template) => (
                <Button
                  key={template}
                  size="sm"
                  variant={selectedTemplate === template ? "solid" : "outline"}
                  colorScheme={selectedTemplate === template ? "brand" : "gray"}
                  onClick={() => setSelectedTemplate(template)}
                  fontSize="sm"
                  px={3}
                  py={1.5}
                  h="auto"
                  rounded="full"
                >
                  {template}
                </Button>
              ))}
            </Flex>
          </Box>
          
          <HStack spacing={2} w="full">
            <Button colorScheme="brand" size="sm" flex={1}>
              PDF生成
            </Button>
            <Button variant="outline" size="sm" flex={1}>
              共有リンク作成
            </Button>
          </HStack>
        </VStack>
      </Card>

      <Card title="共有スコープ/権限">
        <VStack spacing={3} align="stretch">
          <Checkbox
            isChecked={permissions.timeLimited}
            onChange={(e) => setPermissions({...permissions, timeLimited: e.target.checked})}
            fontSize="sm"
          >
            閲覧期限: 7日
          </Checkbox>
          
          <Checkbox
            isChecked={permissions.downloadDisabled}
            onChange={(e) => setPermissions({...permissions, downloadDisabled: e.target.checked})}
            fontSize="sm"
          >
            ダウンロード禁止
          </Checkbox>
          
          <Checkbox
            isChecked={permissions.personalInfoMasked}
            onChange={(e) => setPermissions({...permissions, personalInfoMasked: e.target.checked})}
            fontSize="sm"
          >
            個人情報マスク
          </Checkbox>
        </VStack>
      </Card>

      <Card title="データ署名/改ざん検知">
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="sm" color="gray.700">
              スナップショット署名:
            </Text>
            <Badge colorScheme="gray" variant="subtle" fontSize="xs">
              未署名
            </Badge>
          </HStack>
          
          <Button colorScheme="brand" size="sm">
            署名する
          </Button>
          
          <Text fontSize="xs" color="gray.500">
            署名時にタイムスタンプとハッシュを保存（ブロックチェーンPoC）。
          </Text>
        </VStack>
      </Card>
    </Grid>
  )
}