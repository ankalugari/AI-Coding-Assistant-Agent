const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const [result] = await db.execute(
      `INSERT INTO users
      (name, email, password)
      VALUES (?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
      ]
    );

    res.status(201).json({
      message: 'Registration successful',
      userId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Registration failed',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Login failed',
    });
  }
});

router.get(
  '/me',
  authMiddleware,
  async (req, res) => {
    try {
      const [users] = await db.execute(
        `SELECT id, name, email
         FROM users
         WHERE id = ?`,
        [req.user.id]
      );

      if (users.length === 0) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      res.json(users[0]);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: 'Unable to get user',
      });
    }
  }
);

module.exports = router;