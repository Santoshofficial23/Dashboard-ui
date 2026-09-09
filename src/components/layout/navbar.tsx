import {Flex, Text } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex bg={'blue.200'} color={'whiteAlpha.400'} justify={'center'} alignItems={'center'} gap={14} fontWeight={'bold'} h={16}>
        <Text fontSize={'2xl'}> Trust Bridge Capital Nepal</Text>    
        </Flex>
  )
}

export default Navbar
