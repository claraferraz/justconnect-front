import { Box, Icon, Link } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { MdEdit } from 'react-icons/md';
import { useProfileStore } from '../../store/profileStore';

export function MyProfilePage() {
  const user = useProfileStore((state) => state.user);
  if (!user) {
    return;
  }
  return (
    <>
      <Box textAlign="right">
        <Link href="/my-profile/edit">
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
      </Box>

      <UserProfile
        name={user.name}
        username={user.username}
        bio={user.bio}
        insta={user.insta}
        linkedin={user.linkedin}
        github={user.github}
        adminBlock={false}
      />
    </>
  );
}
