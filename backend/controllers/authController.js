res.cookie('user_auth_token', token, {
  httpOnly: true,
  secure: true,  // Required for HTTPS
  sameSite: 'none',  // Required for cross-origin cookies
  path: '/',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
});