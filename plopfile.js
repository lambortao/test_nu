module.exports = (plop) => {
  plop.setGenerator('mobiles', {
    description: '添加一个手机端基础组件',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '组件名叫什么？',
        default: 'myComponent'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'components/AAMobile/{{name}}/index.vue',
        templateFile: 'plop-templates/mobile-componets.hbs'
      }
    ]
  })
  plop.setGenerator('component', {
    description: '添加一个基础组件',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '组件名叫什么？',
        default: 'myComponent'
      },
      {
        type: 'input',
        name: 'path',
        message: '组件路径，从 src 开始',
        default: 'pages/mobile/'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}{{name}}/index.vue',
        templateFile: 'plop-templates/mobile-componets.hbs'
      }
    ]
  })
}
