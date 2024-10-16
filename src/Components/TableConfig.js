export const initialConfig = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'website', label: 'Website', type: 'link' },
    { key: 'isVerified', label: 'Verified', type: 'checkbox' },
    { key: 'role', label: 'Role', type: 'dropdown', options: ['Admin', 'User', 'Guest'] }
  ];
  
  export const initialData = [
    { name: 'John Doe', website: 'https://johndoe.com', isVerified: true, role: 'Admin' },
    { name: 'Jane Smith', website: 'https://janesmith.com', isVerified: false, role: 'User' }
  ];
  