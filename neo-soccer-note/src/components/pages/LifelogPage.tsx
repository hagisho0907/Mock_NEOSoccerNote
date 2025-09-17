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
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Alert,
  AlertIcon,
  AlertDescription,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid
} from '@chakra-ui/react'
import { Card } from '../Card'
import { 
  FoodEntry, 
  SleepEntry, 
  ExerciseEntry,
  mockFoodEntries,
  mockSleepEntries,
  mockExerciseEntries,
  mockIntegrations 
} from '@/lib/mockData'
import { useState } from 'react'

// アイコン用のシンプルなSVG
const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
)

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
)

interface FoodModalProps {
  isOpen: boolean
  onClose: () => void
  foodEntry?: FoodEntry
  onSave: (entry: Omit<FoodEntry, 'id'>) => void
}

function FoodModal({ isOpen, onClose, foodEntry, onSave }: FoodModalProps) {
  const [formData, setFormData] = useState({
    date: foodEntry?.date || new Date().toISOString().split('T')[0],
    mealType: foodEntry?.mealType || 'breakfast',
    name: foodEntry?.name || '',
    protein: foodEntry?.protein || 0,
    fat: foodEntry?.fat || 0,
    carbs: foodEntry?.carbs || 0,
    time: foodEntry?.time || '08:00'
  })

  const handleSave = () => {
    const calories = (formData.protein * 4) + (formData.fat * 9) + (formData.carbs * 4)
    onSave({
      ...formData,
      calories
    })
    onClose()
  }

  const mealTypeLabels = {
    breakfast: '朝食',
    lunch: '昼食', 
    dinner: '夕食',
    snack: '間食'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{foodEntry ? '食事記録を編集' : '食事記録を追加'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <HStack w="full" spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">日付</FormLabel>
                <Input
                  type="date"
                  size="sm"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">時間</FormLabel>
                <Input
                  type="time"
                  size="sm"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm">食事種別</FormLabel>
              <Select
                size="sm"
                value={formData.mealType}
                onChange={(e) => setFormData({...formData, mealType: e.target.value as FoodEntry['mealType']})}
              >
                {Object.entries(mealTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">食事内容</FormLabel>
              <Input
                size="sm"
                placeholder="例: 鶏胸肉サラダ + 玄米"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </FormControl>

            <SimpleGrid columns={3} spacing={4} w="full">
              <FormControl>
                <FormLabel fontSize="sm">タンパク質 (g)</FormLabel>
                <NumberInput
                  size="sm"
                  value={formData.protein}
                  onChange={(value) => setFormData({...formData, protein: Number(value)})}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">脂質 (g)</FormLabel>
                <NumberInput
                  size="sm"
                  value={formData.fat}
                  onChange={(value) => setFormData({...formData, fat: Number(value)})}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">炭水化物 (g)</FormLabel>
                <NumberInput
                  size="sm"
                  value={formData.carbs}
                  onChange={(value) => setFormData({...formData, carbs: Number(value)})}
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </SimpleGrid>

            <Box w="full" p={3} bg="gray.50" rounded="md">
              <Text fontSize="sm" color="gray.600">
                推定カロリー: <strong>{(formData.protein * 4) + (formData.fat * 9) + (formData.carbs * 4)} kcal</strong>
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} size="sm">
            キャンセル
          </Button>
          <Button colorScheme="brand" onClick={handleSave} size="sm">
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

interface SleepModalProps {
  isOpen: boolean
  onClose: () => void
  sleepEntry?: SleepEntry
  onSave: (entry: Omit<SleepEntry, 'id'>) => void
}

function SleepModal({ isOpen, onClose, sleepEntry, onSave }: SleepModalProps) {
  const [formData, setFormData] = useState({
    date: sleepEntry?.date || new Date().toISOString().split('T')[0],
    bedTime: sleepEntry?.bedTime || '23:00',
    wakeTime: sleepEntry?.wakeTime || '07:00',
    quality: sleepEntry?.quality || 7,
    source: sleepEntry?.source || 'manual' as const
  })

  const calculateDuration = (bedTime: string, wakeTime: string) => {
    const bed = new Date(`2024-01-01 ${bedTime}`)
    let wake = new Date(`2024-01-01 ${wakeTime}`)
    
    if (wake <= bed) {
      wake = new Date(`2024-01-02 ${wakeTime}`)
    }
    
    return Math.round((wake.getTime() - bed.getTime()) / (1000 * 60))
  }

  const handleSave = () => {
    const duration = calculateDuration(formData.bedTime, formData.wakeTime)
    onSave({
      ...formData,
      duration
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{sleepEntry ? '睡眠記録を編集' : '睡眠記録を追加'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel fontSize="sm">日付</FormLabel>
              <Input
                type="date"
                size="sm"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </FormControl>

            <HStack w="full" spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">就床時刻</FormLabel>
                <Input
                  type="time"
                  size="sm"
                  value={formData.bedTime}
                  onChange={(e) => setFormData({...formData, bedTime: e.target.value})}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">起床時刻</FormLabel>
                <Input
                  type="time"
                  size="sm"
                  value={formData.wakeTime}
                  onChange={(e) => setFormData({...formData, wakeTime: e.target.value})}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm">睡眠質 (1-10)</FormLabel>
              <NumberInput
                size="sm"
                value={formData.quality}
                onChange={(value) => setFormData({...formData, quality: Number(value)})}
                min={1}
                max={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Box w="full" p={3} bg="gray.50" rounded="md">
              <Text fontSize="sm" color="gray.600">
                睡眠時間: <strong>{Math.floor(calculateDuration(formData.bedTime, formData.wakeTime) / 60)}時間{calculateDuration(formData.bedTime, formData.wakeTime) % 60}分</strong>
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} size="sm">
            キャンセル
          </Button>
          <Button colorScheme="brand" onClick={handleSave} size="sm">
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export function LifelogPage() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>(mockFoodEntries)
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>(mockSleepEntries)
  const [exerciseEntries] = useState<ExerciseEntry[]>(mockExerciseEntries)
  
  const { isOpen: isFoodModalOpen, onOpen: onFoodModalOpen, onClose: onFoodModalClose } = useDisclosure()
  const { isOpen: isSleepModalOpen, onOpen: onSleepModalOpen, onClose: onSleepModalClose } = useDisclosure()

  const handleSaveFood = (entry: Omit<FoodEntry, 'id'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString()
    }
    setFoodEntries(prev => [...prev, newEntry])
  }

  const handleSaveSleep = (entry: Omit<SleepEntry, 'id'>) => {
    const newEntry: SleepEntry = {
      ...entry,
      id: Date.now().toString()
    }
    setSleepEntries(prev => [...prev, newEntry])
  }

  // 今日の栄養摂取サマリー
  const todayFood = foodEntries.filter(entry => entry.date === '2024-09-17')
  const totalNutrition = todayFood.reduce((acc, entry) => ({
    protein: acc.protein + entry.protein,
    fat: acc.fat + entry.fat,
    carbs: acc.carbs + entry.carbs,
    calories: acc.calories + entry.calories
  }), { protein: 0, fat: 0, carbs: 0, calories: 0 })

  // 最新の睡眠データ
  const latestSleep = sleepEntries[0]

  // 今日の運動データ
  const todayExercise = exerciseEntries.filter(entry => entry.date === '2024-09-17')
  const totalExercise = todayExercise.reduce((acc, entry) => ({
    duration: acc.duration + entry.duration,
    calories: acc.calories + entry.calories
  }), { duration: 0, calories: 0 })

  // 連携アプリ情報
  const connectedApps = mockIntegrations.filter(integration => 
    ['wearable', 'smartphone'].includes(integration.type) && integration.status === 'connected'
  )

  const mealTypeLabels = {
    breakfast: '朝食',
    lunch: '昼食', 
    dinner: '夕食',
    snack: '間食'
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* 連携状況 */}
      <Alert status="info" rounded="lg">
        <AlertIcon />
        <AlertDescription fontSize="sm">
          連携中のアプリ: {connectedApps.map(app => app.name).join(', ')}からデータを自動取得しています
        </AlertDescription>
      </Alert>

      {/* 今日のサマリー */}
      <Card title="今日のサマリー">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Stat size="sm">
            <StatLabel>カロリー</StatLabel>
            <StatNumber>{totalNutrition.calories}</StatNumber>
            <StatHelpText>kcal</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>睡眠時間</StatLabel>
            <StatNumber>{latestSleep ? `${Math.floor(latestSleep.duration / 60)}h${latestSleep.duration % 60}m` : '-'}</StatNumber>
            <StatHelpText>質: {latestSleep?.quality || '-'}/10</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>運動時間</StatLabel>
            <StatNumber>{totalExercise.duration}</StatNumber>
            <StatHelpText>分</StatHelpText>
          </Stat>
          <Stat size="sm">
            <StatLabel>消費カロリー</StatLabel>
            <StatNumber>{totalExercise.calories}</StatNumber>
            <StatHelpText>kcal</StatHelpText>
          </Stat>
        </SimpleGrid>
      </Card>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
        {/* 食事記録 */}
        <Card 
          title="食事記録" 
          rightElement={
            <IconButton
              aria-label="食事を追加"
              icon={<AddIcon />}
              size="sm"
              colorScheme="brand"
              onClick={onFoodModalOpen}
            />
          }
        >
          <VStack spacing={4} align="stretch">
            {/* PFCバランス */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>PFCバランス</Text>
              <VStack spacing={2}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="xs">P: {totalNutrition.protein}g</Text>
                  <Progress value={(totalNutrition.protein * 4 / totalNutrition.calories) * 100} size="sm" colorScheme="red" flex={1} mx={2} />
                  <Text fontSize="xs">{Math.round((totalNutrition.protein * 4 / totalNutrition.calories) * 100)}%</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="xs">F: {totalNutrition.fat}g</Text>
                  <Progress value={(totalNutrition.fat * 9 / totalNutrition.calories) * 100} size="sm" colorScheme="yellow" flex={1} mx={2} />
                  <Text fontSize="xs">{Math.round((totalNutrition.fat * 9 / totalNutrition.calories) * 100)}%</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="xs">C: {totalNutrition.carbs}g</Text>
                  <Progress value={(totalNutrition.carbs * 4 / totalNutrition.calories) * 100} size="sm" colorScheme="blue" flex={1} mx={2} />
                  <Text fontSize="xs">{Math.round((totalNutrition.carbs * 4 / totalNutrition.calories) * 100)}%</Text>
                </HStack>
              </VStack>
            </Box>

            {/* 食事リスト */}
            <VStack spacing={2} align="stretch">
              {todayFood.map((entry) => (
                <Box key={entry.id} p={2} border="1px" borderColor="gray.200" rounded="md">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={0} flex={1}>
                      <HStack spacing={2}>
                        <Badge size="sm" colorScheme="brand" variant="subtle">
                          {mealTypeLabels[entry.mealType]}
                        </Badge>
                        <Text fontSize="xs" color="gray.500">{entry.time}</Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium">{entry.name}</Text>
                      <Text fontSize="xs" color="gray.600">
                        P: {entry.protein}g F: {entry.fat}g C: {entry.carbs}g ({entry.calories}kcal)
                      </Text>
                    </VStack>
                    <IconButton
                      aria-label="編集"
                      icon={<EditIcon />}
                      size="xs"
                      variant="ghost"
                    />
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Card>

        {/* 睡眠記録 */}
        <Card 
          title="睡眠記録"
          rightElement={
            <IconButton
              aria-label="睡眠を追加"
              icon={<AddIcon />}
              size="sm"
              colorScheme="brand"
              onClick={onSleepModalOpen}
            />
          }
        >
          <VStack spacing={3} align="stretch">
            {sleepEntries.slice(0, 3).map((entry) => (
              <Box key={entry.id} p={3} border="1px" borderColor="gray.200" rounded="md">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">{entry.date}</Text>
                  <Badge size="sm" colorScheme={entry.quality >= 8 ? 'green' : entry.quality >= 6 ? 'yellow' : 'red'} variant="subtle">
                    質: {entry.quality}/10
                  </Badge>
                </HStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" color="gray.600">
                    就床: {entry.bedTime} → 起床: {entry.wakeTime}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    睡眠時間: {Math.floor(entry.duration / 60)}時間{entry.duration % 60}分
                  </Text>
                  {entry.deepSleep && (
                    <Text fontSize="xs" color="gray.600">
                      深い睡眠: {entry.deepSleep}分 / REM: {entry.remSleep}分
                    </Text>
                  )}
                  <Badge size="xs" variant="outline">
                    {entry.source === 'oura' ? 'Oura Ring' : 
                     entry.source === 'apple_health' ? 'Apple Health' : 
                     entry.source === 'garmin' ? 'Garmin' : '手動入力'}
                  </Badge>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Card>

        {/* 運動記録 */}
        <Card title="運動記録">
          <VStack spacing={3} align="stretch">
            {exerciseEntries.slice(0, 3).map((entry) => (
              <Box key={entry.id} p={3} border="1px" borderColor="gray.200" rounded="md">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">{entry.type}</Text>
                  <Text fontSize="xs" color="gray.500">{entry.startTime}</Text>
                </HStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" color="gray.600">
                    時間: {entry.duration}分 / カロリー: {entry.calories}kcal
                  </Text>
                  {entry.heartRate && (
                    <Text fontSize="xs" color="gray.600">
                      平均心拍: {entry.heartRate.average}bpm / 最大: {entry.heartRate.max}bpm
                    </Text>
                  )}
                  <Badge size="xs" variant="outline">
                    {entry.source === 'garmin' ? 'Garmin' :
                     entry.source === 'apple_health' ? 'Apple Health' :
                     entry.source === 'whoop' ? 'WHOOP' : '手動入力'}
                  </Badge>
                </VStack>
              </Box>
            ))}
            
            <Alert status="info" size="sm">
              <AlertIcon />
              <AlertDescription fontSize="xs">
                設定ページで連携したアプリから自動取得されます
              </AlertDescription>
            </Alert>
          </VStack>
        </Card>
      </Grid>

      {/* モーダル */}
      <FoodModal
        isOpen={isFoodModalOpen}
        onClose={onFoodModalClose}
        onSave={handleSaveFood}
      />
      
      <SleepModal
        isOpen={isSleepModalOpen}
        onClose={onSleepModalClose}
        onSave={handleSaveSleep}
      />
    </VStack>
  )
}