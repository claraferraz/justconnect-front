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
    "id": "8bafbbb8-2f52-446d-a891-a909b2987822",
    "title": "Teste de titulo",
    "description": "teste de descrição kjwfhidsjfbwhebfiuw ajwbfqjbwedlwfjrpg ",
    "score": 0,
    "status_open": true,
    "created_at": "2024-11-12T19:45:34.344Z",
    "updated_at": "2024-11-12T19:45:34.344Z",
    "tags": [
      "wqdwqd"
    ],
    "username": "claraadm",
    "commentCount": 0
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
              <PostCard id={post.id} username={post.username} updated_at={post.updated_at}
                      tags={post.tags} title={post.title} description={post.description} score={post.score} created_at={post.created_at} status_open={post.status_open} commentCount={post.commentCount}/>
              </Flex>
            </TabPanel>

            <TabPanel>
              <Flex direction="column" gap="15px">
                <PostCard id={post.id} username={post.username} updated_at={post.updated_at}
                      tags={post.tags} title={post.title} description={post.description} score={post.score} created_at={post.created_at} status_open={post.status_open} commentCount={post.commentCount}/>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}