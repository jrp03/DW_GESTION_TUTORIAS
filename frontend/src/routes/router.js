const expres = require('express');
const router = expres.Router();

router.get("/", (req,res) => {
    res.render('index');
});
router.get("/login", (req,res) => {
    res.render('login');
});

module.exports = router;