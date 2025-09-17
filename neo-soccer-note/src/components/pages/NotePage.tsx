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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Select,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockTasks, mockNotes, Note } from '@/lib/mockData'
import { useState } from 'react'

export function NotePage() {
  const { isOpen: isNoteModalOpen, onOpen: onNoteModalOpen, onClose: onNoteModalClose } = useDisclosure()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    type: 'general' as 'match' | 'training' | 'general'
  })

  // 現在の日付を取得
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  // 月の最初の日と最後の日を取得
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  
  // 月の最初の週の開始日（月曜日）を取得
  const startDate = new Date(firstDay)
  const dayOfWeek = firstDay.getDay()
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  startDate.setDate(firstDay.getDate() - daysToSubtract)

  // カレンダーの日付を生成（6週間分）
  const calendarDays = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    calendarDays.push(date)
  }

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    setSelectedDate(dateStr)
    
    // その日のノートがあるかチェック
    const existingNote = mockNotes.find(note => note.date === dateStr)
    if (existingNote) {
      setNoteForm({
        title: existingNote.title,
        content: existingNote.content,
        type: existingNote.type
      })
    } else {
      setNoteForm({
        title: '',
        content: '',
        type: 'general'
      })
    }
    
    onNoteModalOpen()
  }

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const formatDateForModal = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  const getNotesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return mockNotes.filter(note => note.date === dateStr)
  }

  const handleSaveNote = () => {
    // TODO: 実際の保存処理
    alert(`${formatDateForModal(selectedDate)}のノートを保存しました`)
    onNoteModalClose()
  }

  return (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      {/* カレンダー */}
      <Card title={`${currentYear}年${currentMonth + 1}月 カレンダー`}>
        <VStack spacing={4}>
          {/* 曜日ヘッダー */}
          <SimpleGrid columns={7} spacing={1} w="full">
            {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
              <Box key={day} textAlign="center" py={2} fontWeight="medium" fontSize="sm" color="gray.600">
                {day}
              </Box>
            ))}
          </SimpleGrid>
          
          {/* カレンダー本体 */}
          <SimpleGrid columns={7} spacing={1} w="full">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth
              const isToday = date.toDateString() === today.toDateString()
              const notes = getNotesForDate(date)
              const hasNotes = notes.length > 0
              
              return (
                <Box
                  key={index}
                  minH="60px"
                  p={2}
                  border="1px"
                  borderColor={isToday ? "brand.300" : "gray.200"}
                  bg={isToday ? "brand.50" : isCurrentMonth ? "white" : "gray.50"}
                  rounded="md"
                  cursor={isCurrentMonth ? "pointer" : "default"}
                  opacity={isCurrentMonth ? 1 : 0.4}
                  _hover={isCurrentMonth ? { borderColor: "brand.400", shadow: "sm" } : {}}
                  onClick={() => isCurrentMonth && handleDateClick(date)}
                  transition="all 0.2s"
                >
                  <Text 
                    fontSize="sm" 
                    fontWeight={isToday ? "bold" : "normal"}
                    color={isCurrentMonth ? (isToday ? "brand.600" : "gray.800") : "gray.500"}
                    mb={1}
                  >
                    {date.getDate()}
                  </Text>
                  
                  {hasNotes && isCurrentMonth && (
                    <Box>
                      {notes.slice(0, 2).map((note, noteIndex) => (
                        <Box
                          key={noteIndex}
                          bg={note.type === 'match' ? 'blue.100' : note.type === 'training' ? 'green.100' : 'purple.100'}
                          color={note.type === 'match' ? 'blue.700' : note.type === 'training' ? 'green.700' : 'purple.700'}
                          px={1}
                          py={0.5}
                          rounded="sm"
                          fontSize="xs"
                          mb={0.5}
                          noOfLines={1}
                        >
                          {note.title.length > 8 ? note.title.substring(0, 8) + '...' : note.title}
                        </Box>
                      ))}
                      {notes.length > 2 && (
                        <Text fontSize="xs" color="gray.500">
                          +{notes.length - 2}件
                        </Text>
                      )}
                    </Box>
                  )}
                </Box>
              )
            })}
          </SimpleGrid>
        </VStack>
      </Card>

      {/* 課題/タスク */}
      <Card title="課題/タスク">
        <VStack spacing={3}>
          <VStack spacing={2} w="full">
            {mockTasks.map((task) => (
              <HStack
                key={task.id}
                justify="space-between"
                w="full"
                p={3}
                rounded="md"
                bg={task.completed ? "gray.50" : "white"}
                border="1px"
                borderColor="gray.200"
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

      {/* ノート編集モーダル */}
      <Modal isOpen={isNoteModalOpen} onClose={onNoteModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedDate && formatDateForModal(selectedDate)} - サッカーノート
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">タイトル</FormLabel>
                <Input
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                  placeholder="例: vs Seaside U18 - 試合メモ"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">種別</FormLabel>
                <Select
                  value={noteForm.type}
                  onChange={(e) => setNoteForm({...noteForm, type: e.target.value as any})}
                >
                  <option value="general">一般</option>
                  <option value="match">試合</option>
                  <option value="training">練習</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">内容</FormLabel>
                <Textarea
                  value={noteForm.content}
                  onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                  placeholder="自由にサッカーに関するメモを記入してください&#10;&#10;例:&#10;- 今日の練習で気づいたこと&#10;- 試合での反省点&#10;- 次回の目標"
                  rows={8}
                />
              </FormControl>
              
              <Alert status="info" size="sm">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  ノートは自動で保存されます。いつでも編集可能です。
                </AlertDescription>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNoteModalClose}>
              キャンセル
            </Button>
            <Button colorScheme="brand" onClick={handleSaveNote}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}