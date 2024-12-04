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
import { useState, useEffect } from 'react';
import { UserPostInfo } from '../../interface/UserInterface';
import { fetchPosts, fetchPostsByFollowedTags } from '../../service/Post';

export function HomePage() {
  //ajustar cores das tabs

  const [posts, setPosts] = useState<UserPostInfo[]>([]);
  const [tagPosts, setTagPosts] = useState<UserPostInfo[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [loadingTagPosts, setLoadingTagPosts] = useState<boolean>(false);

  const getPostsList = async () => {
    setLoadingPosts(true);
    try {
      const postsList = await fetchPosts();

      const sortedPosts = postsList.sort(
        (a: UserPostInfo, b: UserPostInfo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setPosts(sortedPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const getPostsListByFollowedTags = async () => {
    setLoadingTagPosts(true);
    try {
      const tagPostsList = await fetchPostsByFollowedTags();

      const sortedTagsPosts = tagPostsList.sort(
        (a: UserPostInfo, b: UserPostInfo) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setTagPosts(sortedTagsPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTagPosts(false);
    }
  };

  useEffect(() => {
    getPostsList();
    getPostsListByFollowedTags();
  }, []);

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
              Tags Seguidas
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {loadingPosts && <p>carregando...</p>}

              <Flex direction="column" gap="15px">
                {posts.length > 0 &&
                  posts.map((post) => (
                    <Box borderBottom="1px solid #B6B4BB" paddingBottom="10px">
                      <PostCard post={post} />
                    </Box>
                  ))}
              </Flex>

              {!loadingPosts && posts.length === 0 && (
                <p>Nenhum post encontrado</p>
              )}
            </TabPanel>

            <TabPanel>
              {loadingTagPosts && <p>carregando...</p>}

              <Flex direction="column" gap="15px">
                {tagPosts.length > 0 &&
                  tagPosts.map((post) => (
                    <Box borderBottom="1px solid #B6B4BB" paddingBottom="10px">
                      <PostCard post={post} />
                    </Box>
                  ))}
              </Flex>

              {!loadingTagPosts && posts.length === 0 && (
                <p>Nenhum post encontrado</p>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
