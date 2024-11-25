import {
  Box,
  Text,
  Flex,
  Card,
  CardHeader,
  CardBody,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchComment } from '../../interface/CommentsInterface';
import { DataText } from '../DataText/DataText';

export function CommentCard({
  post_id,
  content,
  score,
  username,
  created_at,
}: SearchComment) {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  function truncateText(maxLength: number, text?: string) {
    if (text) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + ' [...]';
      }
      return text;
    }
  }

  function handleOpenComment(id?: string): void {
    try {
      navigate(`/posts/${id}`);
    } catch {
      throw new Error('Post não encontrado.');
    }
  }

  return (
    <>
      {content && (
        <Card
          padding="0 20px 20px 0"
          width={'100%'}
          shadow={'none'}
          bg="transparent"
        >
          <CardHeader
            justifyContent="space-between"
            p={0}
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              marginTop={'10px'}
            >
              <Flex
                gap={'15px'}
                fontSize={'12px'}
                marginLeft={'20px'}
                color={'#515151'}
              >
                <Text>{score} curtidas</Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Box onClick={() => handleOpenComment(post_id)}>
              {isDesktop ? (
                <Text fontSize={'14px'} color={'#111111'} marginTop={'5px'}>
                  {truncateText(140, content)}
                </Text>
              ) : (
                <Text fontSize={'14px'} color={'#111111'} marginTop={'5px'}>
                  {truncateText(100, content)}
                </Text>
              )}
            </Box>
          </CardBody>
          <HStack spacing={4} width="100%" justifyContent="space-between">
            <Flex direction="column" alignItems="flex-end">
              <DataText created={created_at} sufix={true} updated={''} />
              <Link to={`/profile/${username}`}>
                <Text
                  fontSize="12px"
                  fontFamily="montserrat"
                  color="#805AD5"
                  _hover={{ color: '#281A45' }}
                >
                  @{username}
                </Text>
              </Link>
            </Flex>
          </HStack>
        </Card>
      )}
    </>
  );
}
