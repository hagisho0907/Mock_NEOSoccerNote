'use client'

import {
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Box,
  Input,
  Flex,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertDescription,
  SimpleGrid
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockChatMessages, mockChatSummaries, ChatSummary } from '@/lib/mockData'
import { useState } from 'react'

const SummaryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

const TodoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

const KeyPointIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
)

export function BuddyPage() {
  const [selectedRole, setSelectedRole] = useState('コーチ(技術/戦術)')
  const [newMessage, setNewMessage] = useState('')
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const { isOpen: isSummaryModalOpen, onOpen: onSummaryModalOpen, onClose: onSummaryModalClose } = useDisclosure()
  const [latestSummary, setLatestSummary] = useState<ChatSummary | null>(null)
  
  const roles = [
    'コーチ(技術/戦術)',
    'フィジカル',
    '栄養',
    'メディカル',
    'メンタル'
  ]

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true)
    
    // サマリ生成のシミュレーション
    setTimeout(() => {
      const newSummary: ChatSummary = {
        id: `${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: '最新の相談セッション',
        todos: [
          '圧縮→スイッチ合図練習 (10分)',
          'ハーフスペース侵入練習 (20分)',
          '受け手の角度作り意識',
          '次回練習での実践'
        ],
        keyPoints: [
          '高位置奪取から3秒でフィニッシュまで到達可能',
          '時間制約に合わせたメニュー調整が効果的',
          '技術と戦術の組み合わせが重要',
          '継続的な改善が成長につながる'
        ],
        createdAt: new Date().toLocaleString('ja-JP')
      }
      
      setLatestSummary(newSummary)
      setIsGeneratingSummary(false)
      onSummaryModalOpen()
    }, 2000)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      <Card title="ロール選択">
        <Flex wrap="wrap" gap={2}>
          {roles.map((role) => (
            <Button
              key={role}
              size="sm"
              variant={selectedRole === role ? "solid" : "outline"}
              colorScheme={selectedRole === role ? "brand" : "gray"}
              onClick={() => setSelectedRole(role)}
              fontSize="xs"
              px={3}
              py={1.5}
              h="auto"
              rounded="full"
            >
              {role}
            </Button>
          ))}
        </Flex>
      </Card>

      <Card title="チャット">
        <VStack spacing={3}>
          <Box
            h="64"
            overflowY="auto"
            rounded="md"
            border="1px"
            borderColor="gray.200"
            p={3}
            bg="gray.50"
            w="full"
          >
            <VStack spacing={3} align="stretch">
              {mockChatMessages.map((message) => (
                <Box key={message.id}>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {message.role === 'assistant' ? 'Buddy' : 'You'}
                  </Text>
                  <Box
                    bg={message.role === 'assistant' ? 'white' : 'brand.50'}
                    border="1px"
                    borderColor={message.role === 'assistant' ? 'gray.200' : 'brand.200'}
                    rounded="xl"
                    p={2}
                  >
                    <Text fontSize="sm">
                      {message.content}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
          
          <VStack spacing={2} w="full">
            <HStack spacing={2} w="full">
              <Input
                placeholder="質問を書く…"
                size="sm"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                flex={1}
              />
              <Button colorScheme="brand" size="sm">
                送信
              </Button>
            </HStack>
            
            <Button
              colorScheme="green"
              size="sm"
              leftIcon={<SummaryIcon />}
              onClick={handleGenerateSummary}
              isLoading={isGeneratingSummary}
              loadingText="生成中..."
              w="full"
            >
              サマリ
            </Button>
          </VStack>
        </VStack>
      </Card>

      <Card title="サマリ掲示板" rightElement={
        <Badge colorScheme="blue" size="sm">
          {mockChatSummaries.length}件
        </Badge>
      }>
        <VStack spacing={3} align="stretch" maxH="80" overflowY="auto">
          {mockChatSummaries.map((summary) => (
            <Box key={summary.id} border="1px" borderColor="gray.200" rounded="lg" p={3} bg="white">
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between" align="start">
                  <Text fontSize="sm" fontWeight="medium" flex={1} noOfLines={2}>
                    {summary.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
                    {formatDate(summary.date)}
                  </Text>
                </HStack>
                
                {summary.todos.length > 0 && (
                  <Box>
                    <Text fontSize="xs" fontWeight="medium" color="green.600" mb={1}>
                      ToDo ({summary.todos.length}件)
                    </Text>
                    <VStack spacing={1} align="stretch">
                      {summary.todos.slice(0, 2).map((todo, index) => (
                        <HStack key={index} spacing={1} fontSize="xs">
                          <TodoIcon />
                          <Text color="gray.700" noOfLines={1}>
                            {todo}
                          </Text>
                        </HStack>
                      ))}
                      {summary.todos.length > 2 && (
                        <Text fontSize="xs" color="gray.500">
                          +{summary.todos.length - 2}件のToDo
                        </Text>
                      )}
                    </VStack>
                  </Box>
                )}
                
                {summary.keyPoints.length > 0 && (
                  <Box>
                    <Text fontSize="xs" fontWeight="medium" color="blue.600" mb={1}>
                      重要ポイント
                    </Text>
                    <VStack spacing={1} align="stretch">
                      {summary.keyPoints.slice(0, 2).map((point, index) => (
                        <HStack key={index} spacing={1} fontSize="xs">
                          <KeyPointIcon />
                          <Text color="gray.700" noOfLines={1}>
                            {point}
                          </Text>
                        </HStack>
                      ))}
                      {summary.keyPoints.length > 2 && (
                        <Text fontSize="xs" color="gray.500">
                          +{summary.keyPoints.length - 2}個のポイント
                        </Text>
                      )}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Card>

      {/* サマリ詳細モーダル */}
      <Modal isOpen={isSummaryModalOpen} onClose={onSummaryModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>会話サマリが生成されました</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {latestSummary && (
              <VStack spacing={4} align="stretch">
                <Alert status="success" size="sm">
                  <AlertIcon />
                  <AlertDescription fontSize="sm">
                    会話の内容をToDoと重要ポイントにまとめました
                  </AlertDescription>
                </Alert>

                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {latestSummary.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mb={4}>
                    {latestSummary.createdAt}
                  </Text>

                  <SimpleGrid columns={1} spacing={4}>
                    <Box>
                      <Text fontSize="md" fontWeight="medium" color="green.600" mb={2}>
                        📋 ToDo ({latestSummary.todos.length}件)
                      </Text>
                      <VStack spacing={2} align="stretch">
                        {latestSummary.todos.map((todo, index) => (
                          <HStack key={index} spacing={2}>
                            <Box w="2" h="2" bg="green.400" rounded="full" />
                            <Text fontSize="sm">{todo}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>

                    <Divider />

                    <Box>
                      <Text fontSize="md" fontWeight="medium" color="blue.600" mb={2}>
                        💡 重要ポイント
                      </Text>
                      <VStack spacing={2} align="stretch">
                        {latestSummary.keyPoints.map((point, index) => (
                          <HStack key={index} spacing={2}>
                            <Box w="2" h="2" bg="blue.400" rounded="full" />
                            <Text fontSize="sm">{point}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" onClick={onSummaryModalClose}>
              掲示板に保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}