import { Box, Flex, Text } from '@chakra-ui/react';
import { SearchComment } from '../../interface/CommentsInterface';
import { SearchTypes } from '../../interface/SideBarInterface';
import { TagsCardInfo } from '../../interface/TagsInterface';
import { UserCardData, UserPostInfo } from '../../interface/UserInterface';
import { PostCard } from '../PostCard/PostCard';
import { UserCard } from '../UserCard/UserCard';
import { TagCard } from '../TagCard/TagCard';
import { CommentCard } from '../CommentCard/CommentCard';

export type ResultSearchList = {
  [SearchTypes.comments]: SearchComment[];
  [SearchTypes.posts]: UserPostInfo[];
  [SearchTypes.tags]: TagsCardInfo[];
  [SearchTypes.users]: UserCardData[];
};

export type ResultsBoxProps = {
  open: boolean;
  type: SearchTypes;
  list?: UserCardData[] | UserPostInfo[] | TagsCardInfo[] | SearchComment[];
};

export function ResultsBox({ type, list, open }: ResultsBoxProps) {
  console.log(list);
  return (
    <>
      {open && (
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
              <Box marginBottom={'15px'}>
                <UserCard {...l} />
              </Box>
            ))}
          {type === SearchTypes.tags &&
            list &&
            (list as TagsCardInfo[]).map((l: TagsCardInfo) => (
              <Box marginBottom={'15px'}>
                <TagCard tag={l.tag} postCount={l.postCount} />
              </Box>
            ))}
          {type === SearchTypes.comments &&
            list &&
            (list as SearchComment[]).map((l: SearchComment) => (
              <Box marginBottom={'15px'}>
                <CommentCard {...l} />
              </Box>
            ))}
        </Flex>
      )}
    </>
  );
}
