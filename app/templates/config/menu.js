module.exports.menu = {
  // your app main menu
  main: {
    class: 'nav navbar-nav',
    links: [
      {
        text: 'Home',
        type: 'route',
        name: 'main.index'
      },
      {
        text: 'Get started',
        type: 'route',
        name: 'wejsdoc.findOnePage',
        params: [ 'we', 'getstarted']
      },
      {
        text: 'Github',
        external: true,
        href: 'https://github.com/wejs/we',
        target: '_blank'
      }
    ]
  }
}