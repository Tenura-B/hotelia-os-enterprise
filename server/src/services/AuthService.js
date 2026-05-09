const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/UserRepository');
const dbManager = require('../core/DatabaseManager');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'change-this-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'change-this-refresh-secret';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

class AuthService {
  generateAccessToken(userId) {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }

  generateRefreshToken(userId) {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  }

  async login(userId, password) {
    console.log(`[Auth] Login attempt for: ${userId}`);
    const user = await userRepository.findByUserId(userId);
    
    if (!user) {
      console.error(`[Auth] User not found: ${userId}`);
      throw new Error('Invalid credentials');
    }

    console.log(`[Auth] User found. Comparing passwords...`);
    const isMatch = bcrypt.compareSync(password, user.password_hash);
    
    if (!isMatch) {
      console.error(`[Auth] Password mismatch for: ${userId}`);
      // Log first few chars of hash to verify it's the correct one
      console.log(`[Auth] DB Hash starts with: ${user.password_hash.substring(0, 10)}...`);
      throw new Error('Invalid credentials');
    }

    console.log(`[Auth] Login successful for: ${userId}`);
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    await dbManager.queryMaster(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, refreshToken, expiresAt]
    );

    return { accessToken, refreshToken, userId };
  }

  async refresh(token) {
    const rows = await dbManager.queryMaster('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    const stored = rows[0];
    if (!stored) throw new Error('Refresh token invalid');

    try {
      const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
      if (payload.userId !== stored.user_id) {
        await this.revokeRefreshToken(token);
        throw new Error('Refresh token invalid');
      }

      const accessToken = this.generateAccessToken(payload.userId);
      return { accessToken, userId: payload.userId };
    } catch (err) {
      await this.revokeRefreshToken(token);
      throw new Error('Refresh token invalid');
    }
  }

  async revokeRefreshToken(token) {
    await dbManager.queryMaster('DELETE FROM refresh_tokens WHERE token = ?', [token]);
  }

  verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
}

module.exports = new AuthService();
