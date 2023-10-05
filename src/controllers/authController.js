const router = require('express').Router();
const authService = require('../services/authService.js');
const {COOKIE_SESSION_NAME} =require('../config/constants.js')
const {isAuth, isGuest} = require('../middlewares/authMiddleware.js')
router.get('/login', isGuest, (req, res) => {

    res.render('auth/login');
})
router.get('/register', (req, res) => {

    res.render('auth/register');
});

router.post('/login', isGuest,  async(req, res) => {
const {password, username } = req.body;
try{
    const user = await authService.login(username, password);
    const token = await authService.createToken(user);
res.cookie(COOKIE_SESSION_NAME, token);
    console.log(token, "token");
    res.redirect('/')
}
catch(err){
    console.log(err)
}


})
router.post('/register',isGuest,  async(req, res) => {
const { password, repeatPassword, ...userData } = req.body;
if(password !== repeatPassword){
  return  res.render('auth/register', {error: 'Password mismatch!'})
}
try{
const user = await authService.register({password, ...userData});
const token = authService.createToken(user);
res.cookie(COOKIE_SESSION_NAME, token);
res.redirect('/')
}
catch(error){
    return  res.render('auth/register', {error: 'Db error'})
}
})

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
    res.redirect('/')
})

module.exports = router;
