module.exports = () => {
  return [
    {
      opt: 'create',
      table: 'demo_users',
      column: {
        id: { type: 'increments' },
        user_name: { type: 'string', length: '32', comment: '用户名' },
        age: { type: 'float', precision: 3, scale: 0, comment: '年龄' },
        created_at: { type: 'timestamp', comment: '创建时间' },
        updated_at: { type: 'datetime', comment: '更新时间' },
        deleted_at: { type: 'datetime', comment: '删除时间' }
      }
    },
    {
      opt: 'addColumn',
      table: 'demo_users',
      field: 'real_name',
      content: {
        type: 'string',
        length: '64',
        comment: '真实姓名',
        after: 'user_name'
      }
    },
    {
      opt: 'renameTable',
      from_table: 'demo_users',
      to_table: 'demo_new_users'
    }
    // {
    //   opt: 'query',
    //   sql: 'ALTER TABLE user_name CHANGE name name INT;'
    // }
  ]
}
