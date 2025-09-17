'use client'

import {
  Box,
  Flex,
  Heading,
  BoxProps
} from '@chakra-ui/react'

interface CardProps extends BoxProps {
  title: string
  rightElement?: React.ReactNode
}

export function Card({ title, rightElement, children, ...props }: CardProps) {
  return (
    <Box
      bg="white"
      rounded="2xl"
      shadow="sm"
      border="1px"
      borderColor="gray.200"
      p={4}
      {...props}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Heading size="sm" color="gray.800">
          {title}
        </Heading>
        {rightElement}
      </Flex>
      {children}
    </Box>
  )
}