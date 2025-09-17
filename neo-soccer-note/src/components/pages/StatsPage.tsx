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
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  AspectRatio,
  Image,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertDescription,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react'
import { Card } from '../Card'
import { useState } from 'react'
import { 
  mockIntegrations, 
  VideoClip, 
  MatchStats, 
  mockVideoClips, 
  mockMatchStats 
} from '@/lib/mockData'

// アイコン
const ImportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
)

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videos: VideoClip[]
  onGenerateHighlight: (videoIds: string[]) => void
}

function VideoModal({ isOpen, onClose, videos, onGenerateHighlight }: VideoModalProps) {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])

  const handleVideoToggle = (videoId: string) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    )
  }

  const handleGenerate = () => {
    onGenerateHighlight(selectedVideos)
    onClose()
    setSelectedVideos([])
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ハイライト生成 - 動画選択</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              ハイライトに含める動画を選択してください
            </Text>
            
            <SimpleGrid columns={2} spacing={4}>
              {videos.map((video) => (
                <Box key={video.id} position="relative">
                  <Box
                    border="2px"
                    borderColor={selectedVideos.includes(video.id) ? "brand.500" : "gray.200"}
                    rounded="lg"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => handleVideoToggle(video.id)}
                    transition="all 0.2s"
                    _hover={{ borderColor: "brand.300" }}
                  >
                    <AspectRatio ratio={16/9}>
                      <Box bg="gray.100" position="relative">
                        <Box
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          bg="blackAlpha.700"
                          rounded="full"
                          p={2}
                        >
                          <PlayIcon />
                        </Box>
                        <Box
                          position="absolute"
                          bottom={2}
                          right={2}
                          bg="blackAlpha.700"
                          color="white"
                          px={2}
                          py={1}
                          rounded="md"
                          fontSize="xs"
                        >
                          {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                        </Box>
                      </Box>
                    </AspectRatio>
                    <Box p={2}>
                      <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
                        {video.title}
                      </Text>
                      <HStack spacing={1} mt={1}>
                        <Badge size="xs" colorScheme={video.source === 'veo' ? 'blue' : 'green'}>
                          {video.source.toUpperCase()}
                        </Badge>
                        {video.tags.map((tag) => (
                          <Badge key={tag} size="xs" variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                  </Box>
                  
                  {selectedVideos.includes(video.id) && (
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      bg="brand.500"
                      color="white"
                      rounded="full"
                      p={1}
                    >
                      <ImportIcon />
                    </Box>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button 
            colorScheme="brand" 
            onClick={handleGenerate}
            disabled={selectedVideos.length === 0}
          >
            ハイライト生成 ({selectedVideos.length}本選択)
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export function StatsPage() {
  const [sessionForm, setSessionForm] = useState({
    type: 'match',
    date: '',
    opponent: '',
    playTime: '',
    formation: '',
    position: ''
  })

  const [matchStats, setMatchStats] = useState<MatchStats>({
    id: '',
    sessionId: '',
    goals: 0,
    assists: 0,
    shots: 0,
    shotsOnTarget: 0,
    passes: 0,
    passAccuracy: 0,
    crosses: 0,
    crossAccuracy: 0,
    duelsWon: 0,
    duelsTotal: 0,
    pressures: 0,
    intercepts: 0,
    tackles: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 0,
    playerRating: 0
  })

  const { isOpen: isVideoModalOpen, onOpen: onVideoModalOpen, onClose: onVideoModalClose } = useDisclosure()

  // 連携済みの動画サービス
  const connectedVideoServices = mockIntegrations.filter(
    integration => integration.type === 'video' && integration.status === 'connected'
  )

  const handleImportFromService = (serviceName: string) => {
    // TODO: 実際のサービスからのインポート処理
    alert(`${serviceName}からデータを取り込みます`)
  }

  const handleGenerateHighlight = (videoIds: string[]) => {
    // TODO: 実際のハイライト生成処理
    alert(`${videoIds.length}本の動画からハイライトを生成します`)
  }

  return (
    <VStack spacing={6} align="stretch">
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>基本情報</Tab>
          <Tab>詳細スタッツ</Tab>
          <Tab>動画管理</Tab>
        </TabList>

        <TabPanels>
          {/* 基本情報タブ */}
          <TabPanel px={0}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <Card title="セッション登録">
                <VStack spacing={4}>
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

              {/* 外部サービス連携 */}
              <Card title="外部サービス連携">
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    連携済みサービスからデータを取り込む
                  </Text>
                  
                  {connectedVideoServices.length > 0 ? (
                    <VStack spacing={2}>
                      {connectedVideoServices.map((service) => (
                        <HStack key={service.id} justify="space-between" w="full" p={3} border="1px" borderColor="gray.200" rounded="md">
                          <VStack align="start" spacing={0}>
                            <Text fontSize="sm" fontWeight="medium">{service.name}</Text>
                            <Text fontSize="xs" color="gray.500">
                              最終同期: {service.lastSync}
                            </Text>
                          </VStack>
                          <Button 
                            size="sm" 
                            colorScheme="brand" 
                            leftIcon={<ImportIcon />}
                            onClick={() => handleImportFromService(service.name)}
                          >
                            取り込み
                          </Button>
                        </HStack>
                      ))}
                    </VStack>
                  ) : (
                    <Alert status="warning" size="sm">
                      <AlertIcon />
                      <AlertDescription fontSize="sm">
                        設定ページでVeoやHudlと連携してください
                      </AlertDescription>
                    </Alert>
                  )}
                </VStack>
              </Card>
            </Grid>
          </TabPanel>

          {/* 詳細スタッツタブ */}
          <TabPanel px={0}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <Card title="攻撃スタッツ">
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">ゴール</FormLabel>
                    <NumberInput size="sm" value={matchStats.goals} onChange={(value) => setMatchStats({...matchStats, goals: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">アシスト</FormLabel>
                    <NumberInput size="sm" value={matchStats.assists} onChange={(value) => setMatchStats({...matchStats, assists: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">シュート</FormLabel>
                    <NumberInput size="sm" value={matchStats.shots} onChange={(value) => setMatchStats({...matchStats, shots: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">枠内シュート</FormLabel>
                    <NumberInput size="sm" value={matchStats.shotsOnTarget} onChange={(value) => setMatchStats({...matchStats, shotsOnTarget: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">クロス</FormLabel>
                    <NumberInput size="sm" value={matchStats.crosses} onChange={(value) => setMatchStats({...matchStats, crosses: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">クロス成功率 (%)</FormLabel>
                    <NumberInput size="sm" value={matchStats.crossAccuracy} onChange={(value) => setMatchStats({...matchStats, crossAccuracy: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card title="パス・ポゼッション">
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">パス本数</FormLabel>
                    <NumberInput size="sm" value={matchStats.passes} onChange={(value) => setMatchStats({...matchStats, passes: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">パス成功率 (%)</FormLabel>
                    <NumberInput size="sm" value={matchStats.passAccuracy} onChange={(value) => setMatchStats({...matchStats, passAccuracy: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">デュエル勝利</FormLabel>
                    <NumberInput size="sm" value={matchStats.duelsWon} onChange={(value) => setMatchStats({...matchStats, duelsWon: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">デュエル総数</FormLabel>
                    <NumberInput size="sm" value={matchStats.duelsTotal} onChange={(value) => setMatchStats({...matchStats, duelsTotal: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card title="守備スタッツ">
                <SimpleGrid columns={2} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">プレッシャー</FormLabel>
                    <NumberInput size="sm" value={matchStats.pressures} onChange={(value) => setMatchStats({...matchStats, pressures: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">インターセプト</FormLabel>
                    <NumberInput size="sm" value={matchStats.intercepts} onChange={(value) => setMatchStats({...matchStats, intercepts: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">タックル</FormLabel>
                    <NumberInput size="sm" value={matchStats.tackles} onChange={(value) => setMatchStats({...matchStats, tackles: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">ファール</FormLabel>
                    <NumberInput size="sm" value={matchStats.fouls} onChange={(value) => setMatchStats({...matchStats, fouls: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">イエローカード</FormLabel>
                    <NumberInput size="sm" value={matchStats.yellowCards} onChange={(value) => setMatchStats({...matchStats, yellowCards: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">レッドカード</FormLabel>
                    <NumberInput size="sm" value={matchStats.redCards} onChange={(value) => setMatchStats({...matchStats, redCards: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
              </Card>

              <Card title="総合評価">
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">出場時間 (分)</FormLabel>
                    <NumberInput size="sm" value={matchStats.minutesPlayed} onChange={(value) => setMatchStats({...matchStats, minutesPlayed: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">選手評価 (1-10)</FormLabel>
                    <NumberInput size="sm" min={1} max={10} step={0.1} value={matchStats.playerRating} onChange={(value) => setMatchStats({...matchStats, playerRating: Number(value)})}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <Button colorScheme="brand" size="sm" w="full">
                    詳細スタッツを保存
                  </Button>
                </VStack>
              </Card>
            </Grid>
          </TabPanel>

          {/* 動画管理タブ */}
          <TabPanel px={0}>
            <VStack spacing={6} align="stretch">
              <Card 
                title="ハイライト自動生成"
                rightElement={
                  <Button 
                    size="sm" 
                    colorScheme="brand" 
                    onClick={onVideoModalOpen}
                    disabled={mockVideoClips.length === 0}
                  >
                    動画選択
                  </Button>
                }
              >
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    取り込んだ動画からハイライトシーンを自動抽出
                  </Text>
                  
                  {mockVideoClips.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {mockVideoClips.slice(0, 4).map((video) => (
                        <HStack key={video.id} spacing={3} p={3} border="1px" borderColor="gray.200" rounded="md">
                          <AspectRatio ratio={16/9} w="80px">
                            <Box bg="gray.100" rounded="md" position="relative">
                              <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                color="gray.600"
                              >
                                <PlayIcon />
                              </Box>
                            </Box>
                          </AspectRatio>
                          <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                              {video.title}
                            </Text>
                            <HStack spacing={1}>
                              <Badge size="xs" colorScheme={video.source === 'veo' ? 'blue' : 'green'}>
                                {video.source.toUpperCase()}
                              </Badge>
                              <Text fontSize="xs" color="gray.500">
                                {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                              </Text>
                            </HStack>
                          </VStack>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Alert status="info" size="sm">
                      <AlertIcon />
                      <AlertDescription fontSize="sm">
                        VeoやHudlから動画を取り込むとハイライト生成が可能になります
                      </AlertDescription>
                    </Alert>
                  )}
                </VStack>
              </Card>

              {/* 生成済みハイライト */}
              <Card title="生成済みハイライト">
                <VStack spacing={3} align="stretch">
                  <HStack justify="space-between" p={3} border="1px" borderColor="gray.200" rounded="md">
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="medium">ゴール & アシスト集</Text>
                      <Text fontSize="xs" color="gray.500">3分28秒 • 2024/09/17生成</Text>
                    </VStack>
                    <HStack spacing={2}>
                      <IconButton aria-label="再生" icon={<PlayIcon />} size="sm" />
                      <IconButton aria-label="ダウンロード" icon={<DownloadIcon />} size="sm" variant="outline" />
                    </HStack>
                  </HStack>

                  <HStack justify="space-between" p={3} border="1px" borderColor="gray.200" rounded="md">
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="medium">守備ハイライト</Text>
                      <Text fontSize="xs" color="gray.500">2分45秒 • 2024/09/16生成</Text>
                    </VStack>
                    <HStack spacing={2}>
                      <IconButton aria-label="再生" icon={<PlayIcon />} size="sm" />
                      <IconButton aria-label="ダウンロード" icon={<DownloadIcon />} size="sm" variant="outline" />
                    </HStack>
                  </HStack>
                </VStack>
              </Card>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* ビデオ選択モーダル */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={onVideoModalClose}
        videos={mockVideoClips}
        onGenerateHighlight={handleGenerateHighlight}
      />
    </VStack>
  )
}