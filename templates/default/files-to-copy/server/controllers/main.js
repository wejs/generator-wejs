/**
 * Main project controller
 */

module.exports = {
  /**
   * @api [get] /
   * description: "By default returns a simple json with page:home"
   * responses:
   *   "200":
   *     description: "Return a simple example data."
   *     schema:
   *       type: object
   *       properties:
   *         online:
   *           type: boolean
   *           example: true
   *         page:
   *           type: string
   *           example: "home"
   */
  index(req, res) {
    res.locals.data = {
      online: true,
      page: 'home'
    };

    res.ok();
  }
};