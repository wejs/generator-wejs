/**
 * Main project controller
 */

module.exports = {
  index: function index(req, res) {
    res.locals.data = {
      page: 'home'
    };

    res.ok();
  }
};