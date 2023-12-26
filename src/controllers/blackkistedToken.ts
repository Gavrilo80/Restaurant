import BlackListToken from "../models/BlackListToken";

const blacklistedTokens = async (req, res) => {
  const token_to_blacklist =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token_to_blacklist) {
    return res.status(403).send("A token is required for logout");
  }

  try {
    // Check if the token is already blacklisted
    const existingToken = await BlackListToken.findOne({
      where: { token: token_to_blacklist }
    });
    if (existingToken) return res.status(401).send('Not an authorized user');

    // Add the token to the blacklist MySQL
    await BlackListToken.create({ token: token_to_blacklist });
    res.status(200).send('Logged out successfully');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Error blacklisting token');
  }
}

export default blacklistedTokens