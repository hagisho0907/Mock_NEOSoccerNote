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
  OrderedList,
  ListItem,
  Link
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockChatMessages, mockWeeklyPlan } from '@/lib/mockData'
import { useState } from 'react'

export function BuddyPage() {
  const [selectedRole, setSelectedRole] = useState('コーチ(技術/戦術)')
  const [newMessage, setNewMessage] = useState('')
  
  const roles = [
    'コーチ(技術/戦術)',
    'フィジカル',
    '栄養',
    'メディカル',
    'メンタル'
  ]

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      <Card 
        title="ロール選択"
        rightElement={
          <Badge colorScheme="brand" variant="subtle" fontSize="xs">
            根拠リンクON
          </Badge>
        }
      >
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
                      {message.references && (
                        <>
                          {' '}根拠: {message.references.map((ref, i) => (
                            <span key={i}>
                              <Link color="blue.500" textDecoration="underline">
                                {ref}
                              </Link>
                              {i < message.references!.length - 1 && ' / '}
                            </span>
                          ))}
                        </>
                      )}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
          
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
        </VStack>
      </Card>

      <Card title="7日ミニプラン">
        <OrderedList fontSize="sm" spacing={1} color="gray.700">
          {mockWeeklyPlan.map((plan, index) => (
            <ListItem key={index}>{plan}</ListItem>
          ))}
        </OrderedList>
      </Card>
    </Grid>
  )
}