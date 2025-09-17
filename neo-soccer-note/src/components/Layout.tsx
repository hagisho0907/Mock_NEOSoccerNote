'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  Tabs,
  Badge,
  HStack
} from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'lifelog', label: 'Lifelog' },
  { id: 'note', label: 'Note' },
  { id: 'buddy', label: 'Buddy' },
  { id: 'support', label: 'Support' },
  { id: 'settings', label: 'Settings' },
]

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={20}>
        <Container maxW="6xl" py={3}>
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Box w={8} h={8} bg="brand.500" rounded="xl" />
              <Heading size="md" color="gray.800">
                NEO Soccer Note
              </Heading>
              <Badge colorScheme="gray" variant="subtle" fontSize="xs">
                MVP Mock
              </Badge>
            </HStack>
            
            <Tabs
              index={TABS.findIndex(tab => tab.id === activeTab)}
              onChange={(index) => onTabChange(TABS[index].id)}
              variant="soft-rounded"
              colorScheme="brand"
              size="sm"
            >
              <TabList>
                {TABS.map((tab) => (
                  <Tab key={tab.id}>{tab.label}</Tab>
                ))}
              </TabList>
            </Tabs>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={6}>
        {children}
      </Container>
    </Box>
  )
}