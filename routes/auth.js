const {Router} = require('express') 

const router = new Router();

router.get('/login', async (req, res) => {
         res.render('auth/login', {
                  title: "Autorization",
                  isLogin: true
         })
})


module.exports = router;