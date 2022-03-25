const router = require('express').Router();
const { githubSignin, githubSigninCallback } = require('../controllers/controllerAuth');


// =========================== GITHUB LOGIN ROUTE ============================
router.get('/user/signin/github', githubSignin);

// ======================== GITHUB CALLBACK ROUTE ======================
router.get('/user/signin/github/callback', githubSigninCallback);


module.exports = router; 