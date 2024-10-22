import { Avatar, 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Flex, 
  Heading, 
  Input, 
  Stack, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs } from "@chakra-ui/react";
import { SearchIcon, BellIcon } from "@chakra-ui/icons";

export function HomePage() {
  return (
    <>
      <header >
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between" 
          margin="25px" 
          flexWrap="wrap"
        >
          {/* BellIcon e Avatar alinhados à esquerda */}
          <Box display="flex" alignItems="center">
            <Heading marginLeft="auto">Just Connect</Heading>
          </Box>

          {/* SearchIcon e Input centralizados */}
          <Box display="flex" alignItems="center" flexGrow={1} justifyContent="center">
            <SearchIcon boxSize={6} marginRight="10px" />
            <Input width={{ base: "200px", md: "300px" }} placeholder='Pesquisar' />
          </Box>

          {/* Heading alinhado à direita */}
          <BellIcon boxSize={8} marginRight="5px" />
            <Stack>
              <Avatar src='https://bit.ly/broken-link'/>
            </Stack>
        </Box>
      </header>

      <Box
      display="flex"
      alignItems=""
      justifyContent="center"
      height="100vh"
      margin="30px"
      color="purple"
      >
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>Recentes</Tab>
            <Tab>Relevantes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card maxW='md'>
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
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
