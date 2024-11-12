import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Icon,
  Tag,
} from '@chakra-ui/react';

import { CiLock } from "react-icons/ci";
import { UnlockIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { UserPostInfo } from '../../interface/UserInterface';


export function PostCard({id, username, title, description, score, status_open, updated_at, tags ,created_at,commentCount }: UserPostInfo) {
  
  const parametros = {
    id : id,
    username:username, 
    updated_at: updated_at, 
    tags: tags,
    created_at: created_at,
    commentCount: commentCount
  }
  console.log(parametros)

  const [dateText, setDateText] = useState('');

  //atualiza automaticamente o tempo da postagem a cada 1 min
  useEffect(() => {
    const date = new Date('2024-11-08T21:54:36.849Z');
    const id = setInterval(() => {
      setDateText(formatDistanceToNow(date, { locale: ptBR, addSuffix: true }));
    }, 60000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Card width="100%" shadow={'none'} bg="transparent">
        <CardHeader
          justifyContent="space-between"
          p={0}
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'} marginTop={"10px"} >
            <Flex gap={"15px"} fontSize={"12px"} marginLeft={"20px"} color={"#515151"}>
              <Text>
                {score} curtidas
              </Text>
              <Text>
                4 comentários
              </Text>
            </Flex>
            {status_open ? (<Icon as={UnlockIcon} color={"#515151"}/>) : (<CiLock color={"#515151"} />)}
          </Flex>
        </CardHeader>
        <CardBody>
          <Link to={"/post/:id"}>
            <Text fontSize={"16px"} bg="transparent" color={"#000000"} fontFamily="montserrat" fontWeight={"500"}>
             {title}
            </Text>
          </Link>
          <Text fontSize={"14px"} color={"#111111"} marginTop={"5px"}>
            {description}
          </Text>
        </CardBody>
        <HStack spacing={4} width="100%" justifyContent="space-between">
          <Flex>
            {['md'].map((size) => (
              <Link to={"/tags/:id"}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="blue"
                
                >
                  +Tag
                </Tag>
              </Link>
            ))}
            {['md'].map((size) => (
              <Link to={"/tags/:id"}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="yellow"
                
                >
                  +Tag
                </Tag>
              </Link>
            ))}
            {['md'].map((size) => (
              <Link to={"/tags/:id"}>
                <Tag
                  margin={'15px'}
                  size={size}
                  key={`${size}-1`}
                  variant="solid"
                  colorScheme="green"
                
                >
                  +Tag
                </Tag>
              </Link>
            ))}
          </Flex>
          <Flex direction="column" alignItems="flex-end">
            <Text fontSize="12px" fontFamily="montserrat" color={"#515151"}>
              {dateText}
            </Text>
            <Link to={"/profile/:id"}>
              <Text fontSize="12px" fontFamily="montserrat" color="purple">
                @username
              </Text>
            </Link>
          </Flex>
        </HStack>
      </Card>
    </>
  );
}