const expres = require('express');
const router = expres.Router();

const passport = require('passport')

router.get("/", (req,res) => {
    res.render('index');
});
router.get("/login", (req,res,next) => {
    res.render('login');
});
router.post("/login", (req,res,next) => {
    const { email, password } = req.body;   
    console.log(req.body);
    res.send("datos recibidos");
});

router.get("/registrar", (req,res,next)=>{
    res.render('registrar');
});
router.post('/registrar', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/registrar',
    passReqToCallback: true,
}));


 
module.exports = router;