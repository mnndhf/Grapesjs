const router = app => {
    app.get('/', (req, res, next) => {
        res.send({
            message: 'Node.js and Express REST API'
        });
    })
}
module.exports = router;