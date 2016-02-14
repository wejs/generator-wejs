/**
 * Main project controller
 */

module.exports = {
  index: function(req, res) {
    res.goTo('/post');
  }
};