export default [
  {
    label: '用户名',
    code: 'name',
    type: 'input',
    condition: 'equal',
    default: true
  },
  {
    label: '职位',
    code: 'position',
    type: 'select',
    condition: 'equal'
  },
  {
    label: '部门',
    code: 'dept',
    type: 'select',
    condition: 'equal'
  },
  {
    label: '签约日期',
    code: 'signDate',
    type: 'date',
    condition: 'greater',
    default: true
  }
]

export const demoOptioins = {
  position: [
    { label: 'CEO', value: 'CEO' },
    { label: 'CTO', value: 'CTO' },
    { label: 'COO', value: 'COO' }
  ],
  dept: [
    { label: 'IT Dept.', value: 'it' },
    { label: 'Financial Dept.', value: 'financial' },
    { label: 'Sales division I', value: 'sale1' },
    { label: 'Sales division II', value: 'sale2' }
  ]
}
