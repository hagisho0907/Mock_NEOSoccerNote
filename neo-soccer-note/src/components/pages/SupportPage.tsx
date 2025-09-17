'use client'

import {
  Grid,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Box,
  IconButton,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'
import { Card } from '../Card'
import { mockPassportFiles } from '@/lib/mockData'
import { useState } from 'react'

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
)

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
)

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
)

export function SupportPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const toast = useToast()

  const handleGeneratePassport = () => {
    setIsGenerating(true)
    
    // パスポート生成のシミュレーション
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "パスポート生成完了",
        description: "サッカーパスポートが生成されました。",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }, 3000)
  }

  const handleViewPassport = (fileName: string) => {
    toast({
      title: "ファイルを開きます",
      description: `${fileName}を表示します。`,
      status: "info",
      duration: 2000,
      isClosable: true,
    })
  }

  const handleDownloadPassport = (fileName: string) => {
    toast({
      title: "ダウンロード開始",
      description: `${fileName}をダウンロードします。`,
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'green'
      case 'generating': return 'orange'
      case 'expired': return 'gray'
      default: return 'gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return '利用可能'
      case 'generating': return '生成中'
      case 'expired': return '期限切れ'
      default: return status
    }
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
      <Card title="パスポート生成">
        <VStack spacing={4} align="stretch">
          <Alert status="info" size="sm">
            <AlertIcon />
            <AlertDescription fontSize="sm">
              最新のデータを基にサッカーパスポートを生成します
            </AlertDescription>
          </Alert>
          
          <HStack spacing={3} w="full">
            <Button 
              colorScheme="brand" 
              size="md" 
              flex={1}
              leftIcon={<FileIcon />}
              onClick={handleGeneratePassport}
              isLoading={isGenerating}
              loadingText="生成中..."
            >
              PDF生成
            </Button>
            <Button 
              variant="outline" 
              size="md" 
              flex={1}
              onClick={() => toast({
                title: "共有リンク作成",
                description: "共有リンクを作成しました。",
                status: "success",
                duration: 2000,
                isClosable: true,
              })}
            >
              共有リンク作成
            </Button>
          </HStack>
        </VStack>
      </Card>

      <Card title="データ署名/改ざん検知">
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="sm" color="gray.700">
              スナップショット署名:
            </Text>
            <Badge colorScheme="gray" variant="subtle" fontSize="xs">
              未署名
            </Badge>
          </HStack>
          
          <Button 
            colorScheme="brand" 
            size="md"
            onClick={() => toast({
              title: "署名完了",
              description: "データに署名を追加しました。",
              status: "success",
              duration: 3000,
              isClosable: true,
            })}
          >
            署名する
          </Button>
          
          <Text fontSize="xs" color="gray.500">
            署名時にタイムスタンプとハッシュを保存（ブロックチェーンPoC）。
          </Text>
        </VStack>
      </Card>

      <Box gridColumn={{ base: "1", md: "1 / -1" }}>
        <Card title="過去のパスポートファイル" rightElement={
          <Badge colorScheme="blue" size="sm">
            {mockPassportFiles.length}件
          </Badge>
        }>
          <VStack spacing={3} align="stretch">
            {mockPassportFiles.map((file) => (
              <Box 
                key={file.id} 
                border="1px" 
                borderColor="gray.200" 
                rounded="lg" 
                p={4}
                bg="white"
                _hover={{ borderColor: "brand.300", shadow: "sm" }}
                transition="all 0.2s"
              >
                <HStack justify="space-between" align="center">
                  <HStack spacing={3} flex={1}>
                    <FileIcon />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                        {file.fileName}
                      </Text>
                      <HStack spacing={3} fontSize="xs" color="gray.500">
                        <Text>生成日: {formatDate(file.generatedDate)}</Text>
                        <Text>サイズ: {file.fileSize}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  
                  <HStack spacing={2}>
                    <Badge 
                      colorScheme={getStatusColor(file.status)} 
                      size="sm"
                      variant="subtle"
                    >
                      {getStatusLabel(file.status)}
                    </Badge>
                    
                    {file.status === 'ready' && (
                      <>
                        <IconButton
                          aria-label="ファイルを表示"
                          icon={<ViewIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewPassport(file.fileName)}
                        />
                        <IconButton
                          aria-label="ダウンロード"
                          icon={<DownloadIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownloadPassport(file.fileName)}
                        />
                      </>
                    )}
                  </HStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Card>
      </Box>
    </Grid>
  )
}