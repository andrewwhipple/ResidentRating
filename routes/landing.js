
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('userlanding', {
    title: 'Session Demo',
    username: req.session.username
  });
};