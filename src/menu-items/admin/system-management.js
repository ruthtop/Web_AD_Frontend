// assets
import { IconAdjustments } from '@tabler/icons';

// constant
const icons = {
  IconAdjustments
};

// ==============================|| 'FOR REVIEW' MENU ITEMS ||============================== //

const sysManagement = {
  id: 'sys-management',
  title: 'System Management',
  type: 'group',
  children: [
    {
      id: 'manage-book-listings',
      title: 'Book Listings',
      type: 'item',
      url: '/admin/manage-listings',
      icon: icons.IconAdjustments,
      breadcrumbs: false
    },
    {
      id: 'manage-pickup-points',
      title: 'Collection Points',
      type: 'item',
      url: '/admin/collection-points',
      icon: icons.IconAdjustments,
      breadcrumbs: false
    }
  ]
};

export default sysManagement;
