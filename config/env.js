export default {
  // 测试 demo
  development: {
    MODE: 'development',
    ENV_API: 'https://nineunited.brandsh.cn/api',
    BASE_ROUTE: '/home/',
    PORT: 23456,
    PATH: 'https://nineunited.brandsh.cn/static'
  },
  staging: {
    MODE: 'staging',
    ENV_API: 'https://nineunitedtak.com/api',
    BASE_ROUTE: '/stg/',
    PORT: 23451,
    PATH: 'https://nineunitedtak.com/static_stg'
  },
  production: {
    MODE: 'production',
    ENV_API: 'https://nineunitedtak.com/api',
    BASE_ROUTE: '/home/',
    PORT: 23457,
    PATH: 'https://nineunitedtak.com/static'
  }
}
