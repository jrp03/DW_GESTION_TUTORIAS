const expres = require('express');
const router = expres.Router();

router.get("/", (req,res) => {
    res.render('index');
});
router.get("/login", (req,res) => {
    res.render('login');
});
router.post("/login", (req,res) => {
    const { email, password } = req.body;   
    
});


module.exports = router;