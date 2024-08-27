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
            throw new Error(err);
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

    static async followUserById(id, newFollowerId) {
        if (!id) {
            throw new Error('id required');
        }
        try {
            const foundFollowing = await usersModel.find({ following: { $in: newFollowerId } })
            if (foundFollowing[0]) {
                throw new Error("you already follow this user");
            }
            const user = await usersModel.findByIdAndUpdate(
                id,
                { $push: { following: newFollowerId } },
                { new: true }
            );
            const secondUser = await usersModel.findByIdAndUpdate(
                newFollowerId,
                { $push: { followers: id } }
            )
            return user;
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