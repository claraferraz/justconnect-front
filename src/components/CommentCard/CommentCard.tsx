import {
  Box,
  Text,
  Flex,
  Card,
  CardBody,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchComment } from '../../interface/CommentsInterface';
import { DataText } from '../DataText/DataText';

export function CommentCard({
  id,
  comment,
  score,
  post_id,
  user_id,
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
      navigate(`/post/${id}`);
    } catch {
      throw new Error('Post não encontrado.');
    }
  }

  console.log(user_id);
  return (
    <>
      {comment && (
        <Card
          padding="0 20px 20px 0"
          width={'100%'}
          shadow={'none'}
          bg="transparent"
        >
          <CardBody>
            <Box cursor={'pointer'} _hover={{ color: '#805AD5' }}>
              {isDesktop ? (
                <Text
                  _hover={{ color: '#805AD5' }}
                  onClick={() => handleOpenComment(post_id)}
                  fontSize={'14px'}
                  color={'#111111'}
                  marginTop={'5px'}
                >
                  {truncateText(140, comment)}
                </Text>
              ) : (
                <Text
                  _hover={{ color: '#805AD5' }}
                  onClick={() => handleOpenComment(post_id)}
                  fontSize={'14px'}
                  color={'#111111'}
                  marginTop={'5px'}
                >
                  {truncateText(100, comment)}
                </Text>
              )}
            </Box>
          </CardBody>
          <HStack
            spacing={4}
            width="100%"
            justifyContent="space-between"
            padding={'0 20px'}
          >
            <Text fontSize={'12px'} color={'#515151'}>
              {score} curtidas
            </Text>
            <Flex direction="column" alignItems="flex-end">
              <DataText
                created={created_at}
                sufix={true}
                updated={created_at}
              />
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
