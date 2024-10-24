const User = require('../models/user');
exports.saveUser = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);
        
        if (payload) {
            let isAlreadyExist = await User.findOne({email:payload.email});
            if(isAlreadyExist){
                return res.send('user already exist');
            }
            const user = new User(payload);
            user['id'] = `user_${await User.countDocuments() + 1}`;
            const savedUser = await user.save();
            if (savedUser) {
                return res.send('user saved successfully');
            } else {
                return res.send('error savind data');
            }
        } else {
            throw new Error("user data is required");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    try {
        const payload = req.query;
        const users = await User.find(payload);
        if (users.length) {
            return res.send(users);
        } else {
            res.send('no user found');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.id) {
            return res.send('userId is required');
        };
        const updatedUser = await User.findOneAndUpdate({ id: payload.id }, payload);
        if (updatedUser) {
            return res.send('user updated successfully');
        } else {
            res.send('could not update user');
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const payload = req.query;
        if (!payload.id) {
            return res.send('userId is required');
        };
        const updatedUser = await User.findOneAndDelete({ id: payload.id });
        if (updatedUser) {
            return res.send('user deleted successfully');
        } else {
            res.send('could not delete user');
        }
    } catch (error) {
        console.log(error);
    }
}
