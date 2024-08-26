const usersModel = require('../models/users');


class UsersService {

    static async getUserById(id) {
        if (!id) {
            throw new Error('id required')
        }
        try {
            const user = await usersModel.findOne({ _id: id });
            return user;
        }
        catch (err) {
            console.log(err);
            throw new Error('Something went wrong...');
        }
    }

    static async getAllUsers() {
        try {
            const users = await usersModel.find({});
            return users;
        }
        catch (error) {
            console.error(error);
            throw new Error('something wnt wrong...')
        }
    }

    static async addUser(user) {
        try {
            const u = new usersModel(user)
            const us = await u.save()
            return us;
        }
        catch (err) {
            return err.message;
        }
    }

    static async updateUserById(id, data) {
        if (!id) {
            throw new Error('id required')
        }
        try {
            const updatedUser = await usersModel.findByIdAndUpdate(
                id,
                data,
                { new: true }
            );
            return updatedUser;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async deleteUserById(id) {
        if (!id) {
            throw new Error('id required')
        }
        try {
            const deletedUser = await usersModel.findByIdAndDelete({ _id: id });
            return deletedUser
        }
        catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UsersService;