const express = require('express')

const UserController = require('./controllers/UserController');
const SkillsController = require('./controllers/SkillsController')
const HobbyController = require('./controllers/HobbyController')
const { checkAuth } = require('./middlewares');
const logger = require('./logger');

const router = express.Router();

// user related routes
router.post('/login',UserController.login)
router.post('/register-refugee',UserController.register)

// skills related routes
router.post('/create-skill',checkAuth,SkillsController.create)
router.get('/skills-list',checkAuth,SkillsController.getList)
router.get('/skill-detail/:id',checkAuth,SkillsController.getDetail)
router.post('/update-skill/:id',checkAuth,SkillsController.update)
router.get('/delete-skill/:id',checkAuth,SkillsController.deleteData)

// hobby related routes
router.post('/create-hobby',checkAuth,HobbyController.create)
router.get('/hobby-list',checkAuth,HobbyController.getList)
router.get('/hobby-detail/:id',checkAuth,HobbyController.getDetail)
router.post('/update-hobby/:id',checkAuth,HobbyController.update)
router.get('/delete-hobby/:id',checkAuth,HobbyController.deleteData)

// country routes
router.get('/country-list',async (req,res) => {
    let status = 500
    let message = "Oops something went wrong!"
    let list = []

    try {
        await knex("countries").then(response => list = response)
        status = 200
        message = "Country fetched successfully!"
    } catch (error) {
        status = 500
        message = error.message
        logger.error(error)
    }

    return res.json({status,message,list})
})

module.exports = router