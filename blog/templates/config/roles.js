module.exports = {
'roles': {
  'administrator': {
    'name': 'administrator',
    'permissions': []
  },
  'authenticated': {
    'name': 'authenticated',
    'permissions': [
      'find_article',
      'find_menu',
      'find_link',
      'find_vocabulary',
      'find_term',
      'find_file',
      'find_image',
      'find_user',
      'find_portfolio'
    ],
    'isSystemRole': true
  },
  'unAuthenticated': {
    'name': 'unAuthenticated',
    'permissions': [
      'find_article',
      'find_menu',
      'find_link',
      'find_vocabulary',
      'find_term',
      'find_file',
      'find_image',
      'find_user',
      'find_portfolio'
    ],
    'isSystemRole': true
  },
  'owner': {
    'name': 'owner',
    'permissions': [
      'update_article',
      'delete_article',
      'update_user'
    ],
    'isSystemRole': true
  }
}
};
