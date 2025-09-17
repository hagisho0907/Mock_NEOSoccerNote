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
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { Card } from '../Card'
import { 
  mockMedicalHistory, 
  mockScreening, 
  mockRehabPlan, 
  mockLabResults,
  mockIntegrations,
  MedicalHistory,
  Screening
} from '@/lib/mockData'
import { useState } from 'react'

const MedicalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

const RehabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
)

const TestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v2H6c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-1V2h-2v2H9V2H7zm0 6h10v2H7V8zm0 4h10v2H7v-2z"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

export function MedicalPage() {
  const { isOpen: isInjuryModalOpen, onOpen: onInjuryModalOpen, onClose: onInjuryModalClose } = useDisclosure()
  const { isOpen: isScreeningModalOpen, onOpen: onScreeningModalOpen, onClose: onScreeningModalClose } = useDisclosure()
  const { isOpen: isRehabModalOpen, onOpen: onRehabModalOpen, onClose: onRehabModalClose } = useDisclosure()

  const [injuryForm, setInjuryForm] = useState<Partial<MedicalHistory>>({
    bodyPart: '',
    injuryType: '',
    occurredDate: '',
    severity: 'mild',
    treatment: '',
    returnCriteria: '',
    currentStage: ''
  })

  const [screeningForm, setScreeningForm] = useState<Partial<Screening>>({
    date: '',
    rangeOfMotion: {
      shoulder: { left: 0, right: 0 },
      hip: { left: 0, right: 0 },
      ankle: { left: 0, right: 0 }
    },
    strength: {
      hamstring: { left: 0, right: 0 },
      quadriceps: { left: 0, right: 0 },
      glutes: { left: 0, right: 0 }
    },
    fmsScore: 0,
    knownRisks: []
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'green'
      case 'moderate': return 'orange'
      case 'severe': return 'red'
      default: return 'gray'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'acute': return 'red'
      case 'subacute': return 'orange'
      case 'return_to_play': return 'green'
      default: return 'gray'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const connectedMedicalServices = mockIntegrations.filter(
    integration => integration.type === 'medical' && integration.status === 'connected'
  )

  return (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        {/* 既往歴・ケガ履歴 */}
        <Card title="既往歴・ケガ履歴" rightElement={
          <Button 
            size="sm" 
            colorScheme="brand"
            leftIcon={<MedicalIcon />}
            onClick={onInjuryModalOpen}
          >
            追加
          </Button>
        }>
          <VStack spacing={3} align="stretch">
            {mockMedicalHistory.map((injury) => (
              <Box key={injury.id} border="1px" borderColor="gray.200" rounded="lg" p={4}>
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" fontSize="sm">{injury.bodyPart} - {injury.injuryType}</Text>
                    <Badge colorScheme={getSeverityColor(injury.severity)} size="sm">
                      {injury.severity === 'mild' ? '軽度' : injury.severity === 'moderate' ? '中度' : '重度'}
                    </Badge>
                  </HStack>
                  
                  <HStack spacing={4} fontSize="xs" color="gray.600">
                    <Text>発生: {formatDate(injury.occurredDate)}</Text>
                  </HStack>
                  
                  <Text fontSize="xs" color="gray.600">
                    治療: {injury.treatment}
                  </Text>
                  
                  <Box>
                    <Text fontSize="xs" fontWeight="medium" color="gray.700">
                      復帰基準: {injury.returnCriteria}
                    </Text>
                    <Text fontSize="xs" color="brand.600" fontWeight="medium">
                      現在: {injury.currentStage}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Card>

        {/* スクリーニング */}
        <Card title="スクリーニング" rightElement={
          <Button 
            size="sm" 
            colorScheme="brand"
            leftIcon={<TestIcon />}
            onClick={onScreeningModalOpen}
          >
            測定
          </Button>
        }>
          <VStack spacing={4} align="stretch">
            {mockScreening.map((screening) => (
              <Box key={screening.id} border="1px" borderColor="gray.200" rounded="lg" p={4}>
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" fontSize="sm">測定日: {formatDate(screening.date)}</Text>
                    <Badge colorScheme={screening.fmsScore >= 14 ? 'green' : 'orange'} size="sm">
                      FMS: {screening.fmsScore}/21
                    </Badge>
                  </HStack>

                  <Box>
                    <Text fontSize="xs" fontWeight="medium" mb={2}>可動域 (度)</Text>
                    <SimpleGrid columns={3} spacing={2} fontSize="xs">
                      <Box>
                        <Text color="gray.600">肩関節</Text>
                        <Text>L:{screening.rangeOfMotion.shoulder.left} R:{screening.rangeOfMotion.shoulder.right}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.600">股関節</Text>
                        <Text>L:{screening.rangeOfMotion.hip.left} R:{screening.rangeOfMotion.hip.right}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.600">足関節</Text>
                        <Text>L:{screening.rangeOfMotion.ankle.left} R:{screening.rangeOfMotion.ankle.right}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="medium" mb={2}>筋力 (%)</Text>
                    <SimpleGrid columns={3} spacing={2} fontSize="xs">
                      <Box>
                        <Text color="gray.600">ハムスト</Text>
                        <Text>L:{screening.strength.hamstring.left} R:{screening.strength.hamstring.right}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.600">大腿四頭筋</Text>
                        <Text>L:{screening.strength.quadriceps.left} R:{screening.strength.quadriceps.right}</Text>
                      </Box>
                      <Box>
                        <Text color="gray.600">殿筋</Text>
                        <Text>L:{screening.strength.glutes.left} R:{screening.strength.glutes.right}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>

                  {screening.knownRisks.length > 0 && (
                    <Box>
                      <Text fontSize="xs" fontWeight="medium" mb={1}>既知のリスク</Text>
                      <HStack spacing={1} flexWrap="wrap">
                        {screening.knownRisks.map((risk, index) => (
                          <Badge key={index} size="xs" colorScheme="red" variant="subtle">
                            {risk}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Box>
            ))}
          </VStack>
        </Card>
      </Grid>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        {/* リハビリ計画 */}
        <Card title="リハビリ計画" rightElement={
          <Button 
            size="sm" 
            colorScheme="brand"
            leftIcon={<RehabIcon />}
            onClick={onRehabModalOpen}
          >
            計画作成
          </Button>
        }>
          <VStack spacing={3} align="stretch">
            {mockRehabPlan.map((plan) => (
              <Box key={plan.id} border="1px" borderColor="gray.200" rounded="lg" p={4}>
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Badge colorScheme={getPhaseColor(plan.phase)} size="sm">
                      {plan.phase === 'acute' ? '急性期' : 
                       plan.phase === 'subacute' ? '亜急性期' : '競技復帰期'}
                    </Badge>
                    <Text fontSize="xs" color="gray.600">
                      {formatDate(plan.startDate)} - {formatDate(plan.targetDate)}
                    </Text>
                  </HStack>

                  <Box>
                    <Text fontSize="xs" fontWeight="medium" mb={1}>許可された動作</Text>
                    <HStack spacing={1} flexWrap="wrap">
                      {plan.allowedMovements.map((movement, index) => (
                        <Badge key={index} size="xs" colorScheme="green" variant="outline">
                          {movement}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="medium" mb={1}>運動負荷上限</Text>
                    <Text fontSize="xs" color="gray.600">{plan.exerciseLimit}</Text>
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="medium" mb={1}>ホームエクササイズ</Text>
                    <VStack spacing={1} align="stretch">
                      {plan.homeExerciseVideos.map((video, index) => (
                        <HStack key={index} spacing={2}>
                          <Box w="2" h="2" bg="brand.400" rounded="full" />
                          <Text fontSize="xs">{video}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            ))}
          </VStack>
        </Card>

        {/* クリニック/検査連携 */}
        <Card title="クリニック/検査連携" rightElement={
          <Button 
            size="sm" 
            colorScheme="brand"
            leftIcon={<HeartIcon />}
            disabled={connectedMedicalServices.length === 0}
          >
            同期
          </Button>
        }>
          <VStack spacing={4} align="stretch">
            {/* 連携済みサービス */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>連携済みサービス</Text>
              {connectedMedicalServices.length > 0 ? (
                <VStack spacing={2}>
                  {connectedMedicalServices.map((service) => (
                    <HStack key={service.id} justify="space-between" w="full" p={2} border="1px" borderColor="gray.200" rounded="md">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="medium">{service.name}</Text>
                        <Text fontSize="xs" color="gray.500">
                          最終同期: {service.lastSync}
                        </Text>
                      </VStack>
                      <Badge colorScheme="green" size="sm">接続中</Badge>
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <Alert status="warning" size="sm">
                  <AlertIcon />
                  <AlertDescription fontSize="sm">
                    設定ページで医療機関と連携してください
                  </AlertDescription>
                </Alert>
              )}
            </Box>

            {/* 検査結果 */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>最新の検査結果</Text>
              <VStack spacing={2} align="stretch">
                {mockLabResults.map((result) => (
                  <Box key={result.id} border="1px" borderColor="gray.200" rounded="md" p={3}>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" fontWeight="medium">
                          {result.type === 'blood' ? '血液検査' : 
                           result.type === 'body_composition' ? '体組成' : '遺伝子検査'}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {result.source} • {formatDate(result.date)}
                        </Text>
                      </HStack>
                      
                      <SimpleGrid columns={2} spacing={2} fontSize="xs">
                        {Object.entries(result.results).map(([key, value]) => (
                          <HStack key={key} justify="space-between">
                            <Text color="gray.600">
                              {key === 'hemoglobin' ? 'ヘモグロビン' :
                               key === 'hematocrit' ? 'ヘマトクリット' :
                               key === 'iron' ? '鉄' :
                               key === 'vitamin_d' ? 'ビタミンD' :
                               key === 'body_fat' ? '体脂肪率' :
                               key === 'muscle_mass' ? '筋肉量' :
                               key === 'bone_mass' ? '骨量' :
                               key === 'bmr' ? '基礎代謝' : key}
                            </Text>
                            <Text fontWeight="medium">{value}{
                              key.includes('hemoglobin') || key.includes('hematocrit') ? 'g/dL' :
                              key.includes('iron') || key.includes('vitamin_d') ? 'ng/mL' :
                              key.includes('fat') ? '%' :
                              key.includes('mass') ? 'kg' :
                              key.includes('bmr') ? 'kcal' : ''
                            }</Text>
                          </HStack>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Card>
      </Grid>

      {/* 既往歴追加モーダル */}
      <Modal isOpen={isInjuryModalOpen} onClose={onInjuryModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>既往歴・ケガ履歴 追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={3} w="full">
                <FormControl>
                  <FormLabel fontSize="sm">部位</FormLabel>
                  <Input 
                    placeholder="例: 右膝"
                    value={injuryForm.bodyPart || ''}
                    onChange={(e) => setInjuryForm({...injuryForm, bodyPart: e.target.value})}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">傷害種</FormLabel>
                  <Input 
                    placeholder="例: 内側側副靭帯損傷"
                    value={injuryForm.injuryType || ''}
                    onChange={(e) => setInjuryForm({...injuryForm, injuryType: e.target.value})}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} spacing={3} w="full">
                <FormControl>
                  <FormLabel fontSize="sm">発生日</FormLabel>
                  <Input 
                    type="date"
                    value={injuryForm.occurredDate || ''}
                    onChange={(e) => setInjuryForm({...injuryForm, occurredDate: e.target.value})}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">重症度</FormLabel>
                  <Select 
                    value={injuryForm.severity || 'mild'}
                    onChange={(e) => setInjuryForm({...injuryForm, severity: e.target.value as 'mild' | 'moderate' | 'severe'})}
                  >
                    <option value="mild">軽度</option>
                    <option value="moderate">中度</option>
                    <option value="severe">重度</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="sm">治療</FormLabel>
                <Textarea 
                  placeholder="例: 保存療法、理学療法"
                  value={injuryForm.treatment || ''}
                  onChange={(e) => setInjuryForm({...injuryForm, treatment: e.target.value})}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">復帰基準</FormLabel>
                <Textarea 
                  placeholder="例: 痛みなし、可動域制限なし、筋力90%以上"
                  value={injuryForm.returnCriteria || ''}
                  onChange={(e) => setInjuryForm({...injuryForm, returnCriteria: e.target.value})}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">現在のステージ</FormLabel>
                <Input 
                  placeholder="例: フェーズ3: 競技復帰準備"
                  value={injuryForm.currentStage || ''}
                  onChange={(e) => setInjuryForm({...injuryForm, currentStage: e.target.value})}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onInjuryModalClose}>
              キャンセル
            </Button>
            <Button colorScheme="brand" onClick={onInjuryModalClose}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* スクリーニング測定モーダル */}
      <Modal isOpen={isScreeningModalOpen} onClose={onScreeningModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>スクリーニング測定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>可動域</Tab>
                <Tab>筋力</Tab>
                <Tab>FMS・リスク</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">測定日</FormLabel>
                      <Input 
                        type="date"
                        value={screeningForm.date || ''}
                        onChange={(e) => setScreeningForm({...screeningForm, date: e.target.value})}
                      />
                    </FormControl>

                    <SimpleGrid columns={3} spacing={4} w="full">
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>肩関節 (度)</Text>
                        <VStack spacing={2}>
                          <FormControl>
                            <FormLabel fontSize="xs">左</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.shoulder.left || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="xs">右</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.shoulder.right || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                        </VStack>
                      </Box>
                      
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>股関節 (度)</Text>
                        <VStack spacing={2}>
                          <FormControl>
                            <FormLabel fontSize="xs">左</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.hip.left || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="xs">右</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.hip.right || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                        </VStack>
                      </Box>
                      
                      <Box>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>足関節 (度)</Text>
                        <VStack spacing={2}>
                          <FormControl>
                            <FormLabel fontSize="xs">左</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.ankle.left || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="xs">右</FormLabel>
                            <NumberInput size="sm" value={screeningForm.rangeOfMotion?.ankle.right || 0}>
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                        </VStack>
                      </Box>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <SimpleGrid columns={3} spacing={4} w="full">
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>ハムストリング (%)</Text>
                      <VStack spacing={2}>
                        <FormControl>
                          <FormLabel fontSize="xs">左</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.hamstring.left || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="xs">右</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.hamstring.right || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                      </VStack>
                    </Box>
                    
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>大腿四頭筋 (%)</Text>
                      <VStack spacing={2}>
                        <FormControl>
                          <FormLabel fontSize="xs">左</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.quadriceps.left || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="xs">右</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.quadriceps.right || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                      </VStack>
                    </Box>
                    
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>殿筋 (%)</Text>
                      <VStack spacing={2}>
                        <FormControl>
                          <FormLabel fontSize="xs">左</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.glutes.left || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="xs">右</FormLabel>
                          <NumberInput size="sm" value={screeningForm.strength?.glutes.right || 0}>
                            <NumberInputField />
                          </NumberInput>
                        </FormControl>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </TabPanel>

                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">FMSスコア (21点満点)</FormLabel>
                      <NumberInput size="sm" min={0} max={21} value={screeningForm.fmsScore || 0}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="sm">既知のリスク</FormLabel>
                      <Textarea 
                        placeholder="例: 右膝可動域制限、左右筋力差"
                        rows={3}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onScreeningModalClose}>
              キャンセル
            </Button>
            <Button colorScheme="brand" onClick={onScreeningModalClose}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* リハビリ計画作成モーダル */}
      <Modal isOpen={isRehabModalOpen} onClose={onRehabModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>リハビリ計画作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={3} w="full">
                <FormControl>
                  <FormLabel fontSize="sm">フェーズ</FormLabel>
                  <Select>
                    <option value="acute">急性期</option>
                    <option value="subacute">亜急性期</option>
                    <option value="return_to_play">競技復帰期</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm">開始日</FormLabel>
                  <Input type="date" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="sm">許可された動作</FormLabel>
                <Textarea 
                  placeholder="例: ジョギング、軽い方向転換、ボールタッチ"
                  rows={2}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">運動負荷上限</FormLabel>
                <Input placeholder="例: 心拍数150bpm以下、痛み0レベル" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">ホームエクササイズ</FormLabel>
                <Textarea 
                  placeholder="例: 膝安定化エクササイズ、バランストレーニング"
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm">目標日</FormLabel>
                <Input type="date" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRehabModalClose}>
              キャンセル
            </Button>
            <Button colorScheme="brand" onClick={onRehabModalClose}>
              作成
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}