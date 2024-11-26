import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Tag,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { UserPostInfo } from '../../interface/UserInterface';
import { DataText } from '../DataText/DataText';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

interface Props {
  post: UserPostInfo;
}

export function PostCard({
  post: {
    id,
    username,
    title,
    description,
    score,
    status_open,
    updated_at,
    tags,
    created_at,
    commentCount,
  },
}: Props) {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  function truncateText(maxLength: number, text?: string) {
    if (text) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + ' [...]';
      }
      return text;
    }
  }
  return (
    <>
      {description && (
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
                <Text>{commentCount} comentários</Text>
              </Flex>
              {status_open ? (
                <AiOutlineUnlock color={'#515151'} />
              ) : (
                <AiOutlineLock color={'#515151'} />
              )}
            </Flex>
          </CardHeader>
          <CardBody>
            <Link to={`/post/${id}`}>
              <Text
                fontSize={'16px'}
                bg="transparent"
                fontWeight={'500'}
                _hover={{ color: '#805AD5' }}
              >
                {title}
              </Text>
            </Link>
            {isDesktop ? (
              <Text fontSize={'14px'} color={'#111111'} marginTop={'5px'}>
                {truncateText(140, description)}
              </Text>
            ) : (
              <Text fontSize={'14px'} color={'#111111'} marginTop={'5px'}>
                {truncateText(100, description)}
              </Text>
            )}
          </CardBody>
          <HStack spacing={4} width="100%" justifyContent="space-between">
            <Flex flexWrap={'wrap'} marginLeft={'15px'} gap="15px">
              {['md'].map((size) =>
                tags.map((t) => {
                  return (
                    <Link to={`/tags/${t}`}>
                      <Tag
                        size={size}
                        key={`${size}-1`}
                        variant="solid"
                        background="#805AD5"
                        _hover={{ background: '#815ad5d8' }}
                      >
                        {t}
                      </Tag>
                    </Link>
                  );
                })
              )}
            </Flex>
            <Flex direction="column" alignItems="flex-end">
              <DataText
                created={created_at}
                updated={updated_at}
                sufix={true}
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
