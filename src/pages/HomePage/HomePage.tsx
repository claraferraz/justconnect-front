import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { PostCard } from '../../components/PostCard/PostCard';

export function HomePage() {
  //ajustar cores das tabs
  //função de listagem de posts
  //função map para exibit os PostCard

  return (
    <>
      <Box display="flex" justifyContent="center" height="100vh">
        <Tabs
          colorScheme="#281A45 | gray.400"
          isFitted
          variant="line"
          width="100%"
        >
          <TabList>
            <Tab width="50%" fontSize="xl">
              Recentes
            </Tab>
            <Tab width="50%" fontSize="xl">
              Relevantes
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex direction="column" gap="15px">
                <PostCard />
                <hr />
                <PostCard />
              </Flex>
            </TabPanel>

            <TabPanel>
              <Flex direction="column" gap="15px">
                <PostCard />
                <hr />
                <PostCard />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
