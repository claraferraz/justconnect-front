import {
  Divider,
  Tag,
  Box,
  Text,
  Textarea,
  Button,
  useBreakpointValue,
  Tabs,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Switch,
} from '@chakra-ui/react';
import { AiOutlineUnlock, AiOutlineLock } from 'react-icons/ai';
import { MdArrowUpward, MdMoreVert } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../service/Post';
import { UserPostById } from '../../interface/UserInterface';
import { UUID } from 'crypto';

export function PostPage() {
  const { id } = useParams<{ id: string | UUID }>();
  const [post, setPost] = useState<UserPostById | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const MenuComponent = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<MdMoreVert />}
          variant="ghost"
        />
        <MenuList
          display="flex"
          width="261px"
          padding="10px"
          flexDirection="column"
          alignItems="flex-start"
          gap="10px"
          borderRadius="12px"
        >
          <MenuItem>Editar</MenuItem>
          <MenuItem>
            Trancar
            <Switch ml="auto" colorScheme="purple" />
          </MenuItem>
          <MenuItem>Deletar</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const MenuComponent2 = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<MdMoreVert />}
          variant="ghost"
        />
        <MenuList
          display="flex"
          width="261px"
          padding="10px"
          flexDirection="column"
          alignItems="flex-start"
          gap="10px"
          borderRadius="12px"
        >
          <MenuItem>Deletar</MenuItem>
          <MenuItem>Denunciar</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const getPost = async (id?: string | UUID) => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetchPostById(id);
      setPost(response);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, [id]);

  if (loading) return <Text>Carregando...</Text>;

  if (!post) return <Text>Post não encontrado</Text>;

  return (
    <Box>
      <Box mt="39px" display="flex" gap="35px">
        <Text
          color="#805AD5"
          fontSize="14px"
          fontWeight="500"
          lineHeight="20px"
        >
          @{post.username}
        </Text>
        <Text
          marginRight={isDesktop ? '350px' : '100px'}
          fontSize="12px"
          fontWeight="500"
          color="#515151"
        >
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
        <MenuComponent />
      </Box>

      <Text
        mt={isDesktop ? '24px' : '9px'}
        color="#000"
        fontSize="16px"
        fontWeight="600"
      >
        {post.title}
      </Text>

      <Box mt={isDesktop ? '24px' : '8px'} display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <MdArrowUpward style={{ width: '20px', height: '24px' }} />
          <Text fontSize="16px" fontWeight="600" color="#000">
            {post.score}
          </Text>
        </Box>
        <Text
          width="296px"
          marginLeft="37px"
          mt="8px"
          color="#111"
          fontSize="14px"
          fontWeight="500"
        >
          {post.description}
        </Text>
      </Box>

      <Box marginLeft={isDesktop ? '440px' : '126px'} mt="28px" display="flex">
        {post.tags.map((tag, index) => (
          <Tag
            key={index}
            size="md"
            variant="solid"
            colorScheme="purple"
            marginLeft={index > 0 ? '14px' : '0'}
          >
            {tag}
          </Tag>
        ))}
      </Box>

      <Box>
        <Divider mt="15px" background="#DEDEDE" height="1px" />
        <Text
          marginLeft="6px"
          mt="5px"
          color="#515151"
          fontSize="12px"
          fontWeight="500"
        >
          {post.comment.length} comentário{post.comment.length !== 1 ? 's' : ''}
        </Text>
      </Box>

      {post.comment.map((comment) => (
        <Box key={comment.id} mt="20px">
          <MenuComponent2 />
          <Box mt="8px" display="flex" alignItems="center">
            <Box
              marginLeft="30px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <MdArrowUpward style={{ width: '20px', height: '24px' }} />
              <Text fontSize="16px" fontWeight="600" color="#000">
                {comment.score}
              </Text>
            </Box>
            <Text
              marginLeft="26px"
              mt="8px"
              color="#111"
              fontSize="14px"
              fontWeight="400"
            >
              {comment.content}
            </Text>
          </Box>
          <Text
            mt="14px"
            paddingLeft="278px"
            color="#515151"
            fontSize="12px"
            fontWeight="500"
            lineHeight="20px"
          >
            {new Date(comment.created_at).toLocaleDateString()}
          </Text>
          <Text
            color="#805AD5"
            paddingLeft="274px"
            fontSize="12px"
            fontWeight="500"
            lineHeight="20px"
          >
            @{comment.username}
          </Text>
          <Divider
            mt="15px"
            background="#DEDEDE"
            height="1px"
            mx="auto"
            maxWidth="85%"
          />
        </Box>
      ))}

      <Box paddingLeft="13px" mt="30px">
        <Text color="#281A45" fontSize="18px" fontWeight="500">
          Responder
        </Text>
        <Textarea
          borderRadius="6px"
          border="2px solid #805AD5"
          mt="21px"
          placeholder="Descreva sua resposta"
          width={isDesktop ? '550px' : '320px'}
          height="84px"
        />
        <Button
          marginLeft="7px"
          justifyContent="center"
          alignItems="center"
          mt="33px"
          size="lg"
          variant="solid"
          colorScheme="purple"
          width={isDesktop ? '550px' : '320px'}
          h="38px"
        >
          Responder
        </Button>
      </Box>
      <Divider
        mt="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      ></Divider>
      <Tabs
        borderBottom="2px solid #281A45 "
        mt="16px"
        variant="line"
        display="flex"
        width={isDesktop ? '655px' : '100%'}
        height="54px"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          color="#281A45"
          textAlign="center"
          fontSize="18px"
          fontWeight="500"
        >
          Relacionados
        </Text>
      </Tabs>
      <Box>
        <Box
          mt="62px"
          color="#515151"
          fontSize="12px"
          fontWeight="500"
          lineHeight="24px"
          display="flex"
        >
          <Text paddingRight="26px">7 curtidas</Text>
          <Text paddingRight={isDesktop ? '450px' : '135px'}>
            4 comentários
          </Text>
          <AiOutlineUnlock style={{ width: '20px', height: '20px' }} />
        </Box>
        <Text
          width="327px"
          color="#000"
          mt="9px"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="24px"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text
          width="339px"
          height="85px"
          flexDirection="column"
          justifyContent="center"
          display="flex"
          color="#111"
          fontSize="14px"
          fontWeight="500"
          lineHeight="24px"
        >
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flexDirection="column" display="flex" gap="8px">
            <Tag
              mt="6px"
              size="md"
              variant="solid"
              colorScheme="purple"
              display="inline-flex"
              height="24px"
              padding="0px 8px"
              alignItems="center"
              gap="8px"
              borderRadius="6px"
            >
              Tag name
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="purple"
              display="inline-flex"
              height="24px"
              padding="0px 8px"
              alignItems="center"
              gap="8px"
              borderRadius="6px"
              background="#4B6820"
            >
              Tag number 2
            </Tag>
          </Box>
          <Box alignItems="flex-end" flexDirection="column" display="flex">
            <Text
              color="#515151"
              fontSize="12px"
              fontWeight="500"
              lineHeight="20px"
            >
              3 dias atrás
            </Text>
            <Text
              color="#805AD5"
              fontSize="12px"
              fontWeight="500"
              lineHeight="20px"
            >
              @username
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider mt="19px"></Divider>
      <Box>
        <Box
          mt="32px"
          color="#515151"
          fontSize="12px"
          fontWeight="500"
          lineHeight="24px"
          display="flex"
        >
          <Text paddingRight="26px">21 curtidas</Text>
          <Text paddingRight={isDesktop ? '450px' : '135px'}>
            12 comentários
          </Text>
          <AiOutlineLock style={{ width: '20px', height: '20px' }} />
        </Box>
        <Text
          width="327px"
          color="#000"
          mt="9px"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="24px"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text
          width="339px"
          height="85px"
          flexDirection="column"
          justifyContent="center"
          display="flex"
          color="#111"
          fontSize="14px"
          fontWeight="500"
          lineHeight="24px"
        >
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flexDirection="column" display="flex" gap="8px">
            <Tag
              mt="6px"
              size="md"
              variant="solid"
              colorScheme="purple"
              display="inline-flex"
              height="24px"
              padding="0px 8px"
              alignItems="center"
              gap="8px"
              borderRadius="6px"
            >
              Tag name
            </Tag>
          </Box>
          <Box alignItems="flex-end" flexDirection="column" display="flex">
            <Text
              color="#515151"
              fontSize="12px"
              fontWeight="500"
              lineHeight="20px"
            >
              1 mês atrás
            </Text>
            <Text
              color="#805AD5"
              fontSize="12px"
              fontWeight="500"
              lineHeight="20px"
            >
              @username
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider mb="37px" mt="37px"></Divider>
    </Box>
  );
}