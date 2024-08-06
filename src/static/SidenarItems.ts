import { IconType } from 'react-icons';
import { FaUser, FaUsers, FaCamera, FaUserCog } from 'react-icons/fa';
import { GrDocumentNotes } from 'react-icons/gr';
import { PiStudentBold } from 'react-icons/pi';
import { TfiMenuAlt } from 'react-icons/tfi';

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
    icon: PiStudentBold 
  },
  {
    id: 4,
    name: 'Photos',
    icon: FaCamera
  },
  {
    id: 5,
    name: 'Notice',
    icon: GrDocumentNotes 
  },
  {
    id: 6,
    name: 'Menu',
    icon: TfiMenuAlt
  },
  {
    id: 7,
    name: 'Users',
    icon: FaUsers
  }
];

export default SidebarItems;
