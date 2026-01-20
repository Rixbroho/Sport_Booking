const getAllUsers = async(req, res) => {
    res.json({ message: "Get all users" });
};

module.exports = { getAllUsers }