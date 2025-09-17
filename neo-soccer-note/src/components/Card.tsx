'use client'

import {
  Box,
  Flex,
  Heading,
  BoxProps
} from '@chakra-ui/react'

interface CardProps extends Omit<BoxProps, 'title'> {
  title: string | React.ReactNode
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
        {typeof title === 'string' ? (
          <Heading size="sm" color="gray.800">
            {title}
          </Heading>
        ) : (
          <Box>
            {title}
          </Box>
        )}
        {rightElement}
      </Flex>
      {children}
    </Box>
  )
}