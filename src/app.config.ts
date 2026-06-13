export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/template/index',
    'pages/profile/index',
    'pages/editor/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fffaf5',
    navigationBarTitleText: '温柔手账',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fdf8f3'
  },
  tabBar: {
    color: '#9b8f86',
    selectedColor: '#e88fa3',
    backgroundColor: '#fffaf5',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/template/index', text: '模板' },
      { pagePath: 'pages/profile/index', text: '我的' }
    ]
  }
})
