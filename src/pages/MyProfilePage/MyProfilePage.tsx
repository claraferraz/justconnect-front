import { Box, Flex, Icon, Link, useBreakpointValue } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { MdEdit } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';
import { useNavigate } from 'react-router-dom';

export function MyProfilePage() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
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
      <Flex
        direction="column"
        justify="center"
        margin="0 auto"
        maxWidth={isDesktop ? '1024px' : '350px'}
      >
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
            bio={user.bio}
            insta={user.insta}
            linkedin={user.linkedin}
            github={user.github}
            admin_user_block={false}
          />
        </Box>
      </Flex>
    </>
  );
}
