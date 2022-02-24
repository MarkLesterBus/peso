export default [
  {
    header: 'Employer',
    divider: true,
    menu: [
      {
        icon: 'mdi-speedometer',
        title: 'Dashboard',
        to: '/employer',
      },
      {
        icon: 'mdi-file-tree',
        title: 'Jobs',
        to: '/employer/jobs',
      },
      {
        icon: 'mdi-file',
        title: 'Resumes',
        to: '/employer/jobs',
      },
      {
        icon: 'mdi-account-group',
        title: 'Applicants',
        to: '/employer/categories',
      },
    ],
  },
  {
    header: 'SETTINGS',
    divider: false,
    menu: [
      {
        icon: 'mdi-account-key',
        title: 'Account',
        to: '/employer/account',
      },
      {
        icon: 'mdi-domain',
        title: 'Company',
        to: '/employer/company',
      },
    ],
  },
]
