const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1,
    id: 1,
  })
  response.json(users.map((u) => u.toJSON()))
})
usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password) {
    response.status(400).json({
      error:
        'User validation failed: username: Path `password` is required.',
    })
  } else if (body.password.length < 3) {
    response
      .status(400)
      .json({ error: 'password is at least 3 characters long.' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.json(savedUser)
  }
})

module.exports = usersRouter
