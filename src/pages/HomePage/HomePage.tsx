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
  const post = {
    user_id: "6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5",
    title: "teste titulo",
    description: "teste descrição",
    score: 6,
    statusOpen: true,
    updatedAt: '2024-11-08T21:54:36.849Z',
    createdAt: '2024-11-08T21:54:36.849Z',
    id: "6fcddbcb-d48f-4f6c-b7ad-0bfd44b99ac5",
    admin_post_block: false
  }

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
              <PostCard  id={post.id} user_id={post.user_id} updatedAt={post.updatedAt}
                      admin_post_block={post.admin_post_block} title={post.title} description={post.description} score={post.score} statusOpen={post.statusOpen} createdAt={post.createdAt}/>
              </Flex>
            </TabPanel>

            <TabPanel>
              <Flex direction="column" gap="15px">
                <PostCard  id={post.id} user_id={post.user_id} updatedAt={post.updatedAt}
                      admin_post_block={post.admin_post_block} title={post.title} description={post.description} score={post.score} statusOpen={post.statusOpen} createdAt={post.createdAt}/>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}