import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { MdEdit } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';

export function MyProfilePage() {
  const user = useProfileStore((state) => state.user);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/my-profile/edit');
  };

  if (!user) {
    return;
  }
  return (
    <>
      <Flex width="100%" justifyContent="right">
        <Link onClick={handleEdit}>
          <Icon
            mt="15px"
            aria-label="editar"
            cursor="pointer"
            fontSize="24px"
            color="#281A45"
            _hover={{ color: '#805AD5' }}
          >
            <MdEdit />
          </Icon>
        </Link>
      </Flex>
      <Box borderBottom="1px solid #B6B4BB">
        <UserProfile
          name={user.name}
          username={user.username}
          bio={user.bio_description}
          insta={user.instagram}
          linkedin={user.linkedin}
          github={user.github}
          admin_user_block={false}
        />
      </Box>
    </>
  );
}
