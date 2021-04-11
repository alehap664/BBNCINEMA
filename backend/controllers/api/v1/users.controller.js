const {validationResult} = require("express-validator");
const User = require("../../../models/Cinema/user");

const jwt = require("jsonwebtoken")

module.exports = {
  signUp: async (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (result.errors.length !== 0) return res.status(400).send(result.errors);

    const id = async () => {
      const user = await User.find({});
      if(user.length === 0) return "U000000001";

      const records = user.length.toString();
      const increaseID = +records+1;
      const newID = [..."U000000000"];
      newID.splice(-records.length, records.length, ...increaseID.toString());
      return newID.join("");
    }

    const user = new User({
      id: await id(),
      ...req.body,
      rule: "user"
    });
    await user.save();
    res.status(200).send("Đăng ký thành công");
    
  },
  signIn: async (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (result.errors.length !== 0) return res.status(400).send(result.errors);

    const user = await User.findOne({username: req.body.username});
    const secret = user.rule === "admin" 
      ? process.env.ACCESS_TOKEN_ADMIN 
      : process.env.ACCESS_TOKEN_USER
    const token = jwt.sign({id: user.id}, secret)
    res.header("auth-token", token).status(200).send(token);

  }
}