import { Avatar, 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Flex, 
  Heading, 
  HStack,  
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  Tag} from "@chakra-ui/react";


export function HomePage() {
  return (
    <>
      <Box
      display="flex"
      alignItems=""
      justifyContent="center"
      height="100vh"
      margin="30px"
      color="purple"
      >
        <Tabs isFitted variant='enclosed' width="100%">
          <TabList mb='1em'>
            <Tab>Recentes</Tab>
            <Tab>Relevantes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card width="100%" >
                <CardHeader>
                  <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                      <Box>
                        <Heading size='sm'>Segun Adebayo</Heading>
                        <p>Creator, Chakra UI</p>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <p>
                    With Chakra UI, I wanted to sync the speed of development with the speed
                    of design. I wanted the developer to be just as excited as the designer to
                    create a screen.
                  </p>
                </CardBody>
                <HStack spacing={4}>
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                </HStack>
                <CardFooter
                  justify='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button flex='1' variant='ghost'>
                    Like
                  </Button>
                  <Button flex='1' variant='ghost' >
                    Comment
                  </Button>
                  <Button flex='1' variant='ghost'>
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </TabPanel>
            <TabPanel>
            <Card width="100%">
                <CardHeader>
                  <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                      <Box>
                        <Heading size='sm'>Segun Adebayo</Heading>
                        <p>Creator, Chakra UI</p>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae justo in ante commodo egestas. Aenean viverra lobortis eleifend. Cras enim lectus, tincidunt non aliquam sit amet, pretium nec felis. Pellentesque tincidunt varius diam et dignissim. Morbi ipsum magna, sollicitudin sed magna eget, bibendum scelerisque nisi. Proin eget condimentum ipsum. Quisque nec maximus turpis
                  </p>
                </CardBody>
                <HStack spacing={4}>
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                  {['md'].map((size) => (
                    <Tag margin="15px" size={size} key={size} variant='solid' colorScheme='teal'>
                      +Tag
                    </Tag>
                  ))}
                </HStack>
                <CardFooter
                  justify='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button flex='1' variant='ghost'>
                    Like
                  </Button>
                  <Button flex='1' variant='ghost' >
                    Comment
                  </Button>
                  <Button flex='1' variant='ghost'>
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
