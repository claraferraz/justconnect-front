import { Box, Icon, Link } from '@chakra-ui/react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { UsersExample } from '../../UsersExample';
import { MdEdit } from 'react-icons/md';

export function MyProfilePage() {
  const user = UsersExample[0];
  return (
    <>
      <Box width="90vw" textAlign="right">
        <Link href="/edit-profile">
          <Icon
            aria-label="editar"
            cursor="pointer"
            fontSize="24px"
            color="#281A45"
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
      />
    </>
  );
}
