import { IconType } from 'react-icons';
import { FaUser, FaUsers, FaCamera, FaBell, FaBars, FaUserCog } from 'react-icons/fa';

interface SidebarItem {
  id: number;
  name: string;
  icon: IconType;
}

const SidebarItems: SidebarItem[] = [
  {
    id: 1,
    name: 'Profile',
    icon: FaUser
  },
  {
    id: 2,
    name: 'Administrators',
    icon: FaUserCog
  },
  {
    id: 3,
    name: 'Students',
    icon: FaUsers
  },
  {
    id: 4,
    name: 'Photos',
    icon: FaCamera
  },
  {
    id: 5,
    name: 'Notice',
    icon: FaBell
  },
  {
    id: 6,
    name: 'Menu',
    icon: FaBars
  },
  {
    id: 7,
    name: 'Users',
    icon: FaUsers
  }
];

export default SidebarItems;
