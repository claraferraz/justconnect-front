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
  } from "@chakra-ui/react";


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
          <TabList mb='2em'>
            <Tab width="50%" fontSize="xl">Recentes</Tab>
            <Tab width="50%" fontSize="xl">Relevantes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card width="100%" >
                <CardHeader 
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button flex='1' variant='ghost'>
                    curtidas
                  </Button>
                  <Button flex='1' variant='ghost' >
                    comentarios
                  </Button>
                  <Icon as={UnlockIcon}/>
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 2</Heading> <br />
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
              </Card>
            </TabPanel>
            <TabPanel>
              <Card width="100%">
                <CardHeader
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}>
                  <Button flex='1' variant='ghost' >
                    curtidas
                  </Button>
                  <Button flex='1' variant='ghost'>
                    comentários
                  </Button>
                  <Icon as={UnlockIcon} />
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title</Heading> <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae justo in ante commodo egestas. Aenean viverra lobortis eleifend. Cras enim lectus, tincidunt non aliquam sit amet, pretium nec felis. 
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
              </Card>
            </TabPanel>
          </TabPanels>
          
          <TabPanels>
            <TabPanel>
              <Card width="100%" >
                <CardHeader 
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >
                  <Button flex='1' variant='ghost'>
                    curtidas
                  </Button>
                  <Button flex='1' variant='ghost' >
                    comentarios
                  </Button>
                  
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 3</Heading> <br />
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
              </Card>
            </TabPanel>
            <TabPanel>
              <Card >
                <CardHeader
                  justifyContent ='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}>
                  <Button flex='1' variant='ghost' >
                    curtidas
                  </Button>
                  <Button flex='1' variant='ghost'>
                    comentários
                  </Button>
                  <Icon as={UnlockIcon} />
                </CardHeader>
                <CardBody>
                  <Heading size="lg">title 2</Heading> <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae justo in ante commodo egestas. Aenean viverra lobortis eleifend. Cras enim lectus, tincidunt non aliquam sit amet, pretium nec felis. 
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
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
