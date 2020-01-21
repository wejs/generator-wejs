/**
 * Main project controller
 */

module.exports = {
  index(req, res) {
    res.locals.data = {
      page: 'home'
    };

    res.ok();
  }
};