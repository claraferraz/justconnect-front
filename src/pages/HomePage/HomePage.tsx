/* eslint-disable no-irregular-whitespace */
import { UnlockIcon } from "@chakra-ui/icons";
import { 
  Box, 
  Button, 
  Card, 
  Icon,
  CardBody, 
  CardHeader, 
  Heading, 
  HStack,  
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  Tag,
  Flex,
  Text
  } from "@chakra-ui/react";


export function HomePage() {
  return (
    <>
      <Box
      display="flex"
      alignItems=""
      justifyContent="center"
      height="100vh"
      color="purple"
      >
        <Tabs isFitted variant='enclosed' width="100%">
          <TabList>
            <Tab width="50%" fontSize="xl">Recentes</Tab>
            <Tab width="50%" fontSize="xl">Relevantes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card width="100%" shadow={"none"} bg={"gray.100"} >
                <CardHeader 
                  justifyContent ='space-between'                 
                  p={0}
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                 <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        2 curtidas
                      </Button>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        4 comentários
                      </Button>
                    </Flex>
                    <Icon as={UnlockIcon} />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 2</Heading> <br />
                  <p>
                    With Chakra UI, I wanted to sync the speed of development with the speed
                    of design. I wanted the developer to be just as excited as the designer to
                    create a screen.
                  </p>
                </CardBody>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <Flex>
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-1`} variant='solid' colorScheme='blue'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-2`} variant='solid' colorScheme='yellow'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-3`} variant='solid' colorScheme='green'>
                        +Tag
                      </Tag>
                    ))}
                  </Flex>
                  <Flex direction="column" alignItems="flex-end">
                    <Text fontSize="12px" fontFamily="montserrat">
                      2 horas atrás
                    </Text>
                    <Text fontSize="12px" fontFamily="montserrat" color="purple">
                      @username
                    </Text>
                  </Flex>
                </HStack>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card width="100%" shadow={"none"} bg={"gray.100"}>
                <CardHeader 
                  justifyContent ='space-between'
                  p={0}
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        1 curtidas
                      </Button>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        2 comentários
                      </Button>
                    </Flex>
                    <Icon as={UnlockIcon} />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title</Heading> <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae justo in ante commodo egestas. Aenean viverra lobortis eleifend. Cras enim lectus, tincidunt non aliquam sit amet, pretium nec felis. 
                  </p>
                </CardBody>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <Flex>
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-1`} variant='solid' colorScheme='blue'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-2`} variant='solid' colorScheme='yellow'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-3`} variant='solid' colorScheme='green'>
                        +Tag
                      </Tag>
                    ))}
                  </Flex>
                  <Flex direction="column" alignItems="flex-end">
                    <Text fontSize="12px" fontFamily="montserrat">
                      4 dias atrás
                    </Text>
                    <Text fontSize="12px" fontFamily="montserrat" color="purple">
                      @username
                    </Text>
                  </Flex>
                </HStack>
              </Card>
            </TabPanel>
            <hr /> 
          </TabPanels>
          
          <TabPanels>
            <TabPanel>
              <Card width="100%" shadow={"none"} bg={"gray.100"}>
                <CardHeader 
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  p={0}
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        15 curtidas
                      </Button>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        7 comentários
                      </Button>
                    </Flex>
                    <Icon as={UnlockIcon} />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 3</Heading> <br />
                  <p>
                    With Chakra UI, I wanted to sync the speed of development with the speed
                    of design. I wanted the developer to be just as excited as the designer to
                    create a screen.
                  </p>
                </CardBody>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <Flex>
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-1`} variant='solid' colorScheme='orange'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-2`} variant='solid' colorScheme='yellow'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-3`} variant='solid' colorScheme='red'>
                        +Tag
                      </Tag>
                    ))}
                  </Flex>
                  <Flex direction="column" alignItems="flex-end">
                    <Text fontSize="12px" fontFamily="montserrat">
                      5 horas atrás
                    </Text>
                    <Text fontSize="12px" fontFamily="montserrat" color="purple">
                      @username
                    </Text>
                  </Flex>
                </HStack>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card width="100%" shadow={"none"} bg={"gray.100"}>
                <CardHeader
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  p={0}
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        0 curtidas
                      </Button>
                      <Button flex="1" fontSize="12px" fontFamily="montserrat" color="#515151" variant="ghost">
                        2 comentários
                      </Button>
                    </Flex>
                    <Icon as={UnlockIcon} />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 2</Heading> <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae justo in ante commodo egestas. Aenean viverra lobortis eleifend. Cras enim lectus, tincidunt non aliquam sit amet, pretium nec felis. 
                  </p>
                </CardBody>
                <HStack spacing={4} width="100%" justifyContent="space-between">
                  <Flex>
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-1`} variant='solid' colorScheme='red'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-2`} variant='solid' colorScheme='pink'>
                        +Tag
                      </Tag>
                    ))}
                    {['md'].map((size) => (
                      <Tag margin={"15px"} size={size} key={`${size}-3`} variant='solid' colorScheme='purple'>
                        +Tag
                      </Tag>
                    ))}
                  </Flex>
                  <Flex direction="column" alignItems="flex-end">
                    <Text fontSize="12px" fontFamily="montserrat">
                      2 dias atrás
                    </Text>
                    <Text fontSize="12px" fontFamily="montserrat" color="purple">
                      @username
                    </Text>
                  </Flex>
                </HStack>
              </Card>
            </TabPanel>
            <hr />
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}