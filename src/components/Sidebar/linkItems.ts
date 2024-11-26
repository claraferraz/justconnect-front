import { FiHome, FiUser, FiUsers, FiEdit, FiTag } from 'react-icons/fi';
import { MdOutlineSmsFailed } from 'react-icons/md';
import { LinkItemProps } from '../../interface/SideBarInterface';

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Página Inicial', icon: FiHome, path: '/' },
  { name: 'Perfil', icon: FiUser, path: '/my-profile' },
  { name: 'Criar posts', icon: FiEdit, path: '/create-post' },
  { name: 'Usuários', icon: FiUsers, path: '/users' },
  { name: 'Tags', icon: FiTag, path: '/tags/:id' },
  {
    name: 'Denúncias',
    icon: MdOutlineSmsFailed,
    path: '/reported-posts',
  },
];
