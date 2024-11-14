import { Divider, Tag, Box, Text, Textarea, Button } from '@chakra-ui/react';
import { MdArrowUpward, MdMoreVert } from 'react-icons/md';

export function PostPage() {
  return (
    <>
      <Box>
        <Box mt="39px" display="flex" gap="35px">
          <Text
            color="#805AD5"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
          >
            @username
          </Text>
          <Text fontSize="12px" fontWeight="500" color="#515151">
            3 dias atrás
          </Text>
          <MdMoreVert style={{ marginLeft: '100px' }} />
        </Box>

        <Text mt="9px" color="#000" fontSize="16px" fontWeight="600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>

        <Box mt="8px" display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <MdArrowUpward style={{ width: '20px', height: '24px' }} />
            <Text fontSize="16px" fontWeight="600" color="#000">
              8
            </Text>
          </Box>
          <Text
            marginLeft="37px"
            mt="8px"
            color="#111"
            fontSize="14px"
            fontWeight="500"
          >
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Box>

        <Box marginLeft="126px" mt="28px" display="flex">
          <Tag size="md" variant="solid" colorScheme="purple">
            Tag Name
          </Tag>
          <Tag
            size="md"
            variant="solid"
            colorScheme="purple"
            marginLeft="14px"
            background="#4B6820"
          >
            Tag number 2
          </Tag>
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
            2 comentários
          </Text>
        </Box>
        <MdMoreVert style={{ marginTop: '20px', marginLeft: '328px' }} />
        <Box mt="8px" display="flex" alignItems="center">
          <Box
            marginLeft="30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <MdArrowUpward style={{ width: '20px', height: '24px' }} />
            <Text fontSize="16px" fontWeight="600" color="#000">
              4
            </Text>
          </Box>
          <Text
            marginLeft="26px"
            mt="8px"
            color="#111"
            fontSize="14px"
            fontWeight="400"
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
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
          3 dias atrás
        </Text>
        <Text
          color="#805AD5"
          paddingLeft="274"
          fontSize="12px"
          fontWeight="500"
          lineHeight="20px"
        >
          @username
        </Text>
        <Divider
          mt="15px"
          background="#DEDEDE"
          height="1px"
          mx="auto"
          maxWidth="85%"
        />
        <MdMoreVert style={{ marginTop: '20px', marginLeft: '328px' }} />
        <Box mt="8px" display="flex" alignItems="center">
          <Box
            marginLeft="30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <MdArrowUpward style={{ width: '20px', height: '24px' }} />
            <Text fontSize="16px" fontWeight="600" color="#000">
              2
            </Text>
          </Box>
          <Text
            marginLeft="26px"
            mt="8px"
            color="#111"
            fontSize="14px"
            fontWeight="400"
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
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
          3 dias atrás
        </Text>
        <Text
          color="#805AD5"
          paddingLeft="274"
          fontSize="12px"
          fontWeight="500"
          lineHeight="20px"
        >
          @username
        </Text>
        <Divider
          mt="15px"
          background="#DEDEDE"
          height="1px"
          mx="auto"
          maxWidth="85%"
        />
        <Box paddingLeft="20px" mt="30px">
          <Text color="#281A45" fontSize="18px" fontWeight="500">
            Responder
          </Text>
          <Textarea
            borderRadius="6px"
            border="2px solid #805AD5"
            mt="21px"
            placeholder="Descreva sua resposta"
            width="320px"
            height="84px"
          ></Textarea>
          <Button
            padding="0px 24px"
            justifyContent="center"
            alignItems="center"
            mt="33px"
            size="lg"
            variant="solid"
            colorScheme="purple"
            width="320px"
            h="38px"
          >
            Responder
          </Button>
        </Box>
        <Divider mt="61px" background="#DEDEDE" height="1px" />
      </Box>
    </>
  );
}
