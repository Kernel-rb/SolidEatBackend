const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
    res.send('Hello from restaurentRoutes');
});

module.exports = router;