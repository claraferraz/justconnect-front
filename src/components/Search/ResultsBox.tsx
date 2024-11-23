import { Box, Flex, Text } from '@chakra-ui/react';
import { SearchComment } from '../../interface/CommentsInterface';
import { SearchTypes } from '../../interface/SideBarInterface';
import { TagsCardInfo } from '../../interface/TagsInterface';
import { UserCardData, UserPostInfo } from '../../interface/UserInterface';
import { PostCard } from '../PostCard/PostCard';
import { UserCard } from '../UserCard/UserCard';

export type ResultSearchList = {
  [SearchTypes.comments]: SearchComment[];
  [SearchTypes.posts]: UserPostInfo[];
  [SearchTypes.tags]: TagsCardInfo[];
  [SearchTypes.users]: UserCardData[];
};

export type ResultsBoxProps = {
  type: SearchTypes;
  list?: UserCardData[] | UserPostInfo[] | TagsCardInfo[] | SearchComment[];
};

export function ResultsBox({ type, list }: ResultsBoxProps) {
  return (
    <>
      <Flex direction={'column'} paddingY="20px" m={'auto'} align={'center'}>
        {!list ||
          (list.length < 1 && (
            <Text textAlign="center" color="gray.500">
              Nenhum resultado encontrado
            </Text>
          ))}
        {type === SearchTypes.posts &&
          list &&
          (list as UserPostInfo[]).map((l: UserPostInfo) => (
            <Box width={'100%'} borderBottom="1px solid #DEDEDE">
              <PostCard post={l} />
            </Box>
          ))}
        {type === SearchTypes.users &&
          list &&
          (list as UserCardData[]).map((l: UserCardData) => (
            <UserCard {...l} />
          ))}
      </Flex>
    </>
  );
}
