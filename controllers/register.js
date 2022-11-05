const { getUserCollection } = require("./getUserCollection");

async function getRegistered(req, res) {
  try {
    const userData = req.body;
    const { name, email, password } = userData;

    // ** user data validation for all credentials
    if (!name || !email || !password) {
      return res.send({
        success: false,
        message: "User credentials missing",
        status: 403,
      });
    }
    // ** If credentials are validated

    const userDocument = {
      name,
      email,
      password,
    };

    const user = await getUserCollection().insertOne(userDocument);

    res.send({
      success: true,
      data: user,
      message: `Successfully created ${name}`,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getRegistered,
};
