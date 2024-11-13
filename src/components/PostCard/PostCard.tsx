import {
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  Tag,
} from '@chakra-ui/react';

import { UnlockIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
//import { UserPostInfo } from '../../interface/UserInterface';

export function PostCard() {
  //npm install date-fns
  //adicionar props para auto popular o componente
  //número de curtidas e comentários não precisam ser um botão ou ter um hover
  //ao clicar no título, abre o post
  //ajustar tamanho da fonte do título
  //ao clicar em uma tag, abre a tag
  //ao clicar num username, abre o username
  //cadeado cinza
  //hover somente nos clicáveis
  //ajustar margem da direta

  const [dateText, setDateText] = useState('');

  const getPostDate = () => {
    const date = new Date('2024-11-13T15:09:16.607Z');
    setDateText(formatDistanceToNow(date, { locale: ptBR, addSuffix: true }));
  };

  //atualiza automaticamente o tempo da postagem a cada 1 min
  useEffect(() => {
    getPostDate();
    const id = setInterval(() => {
      getPostDate();
    }, 30000);

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
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex>
              <Button
                flex="1"
                fontSize="12px"
                fontFamily="montserrat"
                color="#515151"
                variant="ghost"
              >
                2 curtidas
              </Button>
              <Button
                flex="1"
                fontSize="12px"
                fontFamily="montserrat"
                color="#515151"
                variant="ghost"
              >
                4 comentários
              </Button>
            </Flex>
            <Icon as={UnlockIcon} />
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading size="lg">Titulo</Heading> <br />
          <p>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </p>
        </CardBody>
        <HStack spacing={4} width="100%" justifyContent="space-between">
          <Flex>
            {['md'].map((size) => (
              <Tag
                margin={'15px'}
                size={size}
                key={`${size}-1`}
                variant="solid"
                colorScheme="blue"
              >
                +Tag
              </Tag>
            ))}
            {['md'].map((size) => (
              <Tag
                margin={'15px'}
                size={size}
                key={`${size}-2`}
                variant="solid"
                colorScheme="yellow"
              >
                +Tag
              </Tag>
            ))}
            {['md'].map((size) => (
              <Tag
                margin={'15px'}
                size={size}
                key={`${size}-3`}
                variant="solid"
                colorScheme="green"
              >
                +Tag
              </Tag>
            ))}
          </Flex>
          <Flex direction="column" alignItems="flex-end">
            <Text fontSize="12px" fontFamily="montserrat" color="gray.600">
              {dateText}
            </Text>
            <Text fontSize="12px" fontFamily="montserrat" color="purple">
              @username
            </Text>
          </Flex>
        </HStack>
      </Card>
    </>
  );
}
