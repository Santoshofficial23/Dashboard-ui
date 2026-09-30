import { Flex, Text } from '@chakra-ui/react'

const footer = () => {
  return (
    <Flex bg="blue.100" 
        color="gray.700" align='center' h={12} fontWeight={'bold'} justify='center'  >
        <Text>
          All right reserved 2026
        </Text>
      </Flex>
  )
}

export default footer
