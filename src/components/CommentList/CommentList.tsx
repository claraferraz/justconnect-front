import {
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';
import { MdArrowUpward } from 'react-icons/md';
import { DataText } from '../DataText/DataText';
import { Comment } from '../../interface/CommentsInterface';
import MenuCommentComponent from '../MenuCommentComponent/MenuCommentComponent';

interface CommentListProps {
  comments: Comment[];
  refreshComments: () => void;
}

export function CommentList({ comments, refreshComments }: CommentListProps) {
  return (
    <>
      {comments.map((comment) => (
        <Box key={comment.id} mt="20px">
         
          <MenuCommentComponent
            comment={comment}
            refreshComments={refreshComments}
          />

        
          <Box mt="8px" display="flex" alignItems="center">
            <Box marginLeft="30px" display="flex" flexDirection="column" alignItems="center">
              <MdArrowUpward style={{ width: '20px', height: '24px' }} />
              <Text fontSize="16px" fontWeight="600" color="#000">
                {comment.score}
              </Text>
            </Box>
            <Text marginLeft="26px" mt="8px" color="#111" fontSize="14px" fontWeight="400">
              {comment.comment}
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
            <DataText created={comment.created_at} updated={comment.updated_at} sufix />
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

          <Divider mt="15px" background="#DEDEDE" height="1px" mx="auto" maxWidth="85%" />
        </Box>
      ))}
    </>
  );
}
