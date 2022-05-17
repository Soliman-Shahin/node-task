const User = require('../models/user.model');

// find all users
exports.findAll = async(req, res, next) => {
    try {

        let page = +req.query.page || 1, // page
            limit = +req.query.limit || 10, // limit
            offset = ((page - 1) * limit) || 0, // skip
            order = +req.query.order || ['createdAt', 'desc']; // sort

        let user = await User.findAll({ page: page, limit: limit, offset: offset, order: [order] })

        let count = await User.findAll();

        let totalCount = count.length;

        const pageCount = Math.ceil(totalCount / limit);

        res.status(201).send({ data: user, total: totalCount, pageCount: pageCount, limit: limit, page: page });
    } catch (err) {
        next(err);
    }
}

// create user
exports.signup = async(req, res, next) => {
    try {
        let name = req.body.name;
        let profile = req.file;
        if (profile) {
            profile = profile.filename;
        }

        let user = await User.create({
            name: name,
            profile: profile
        })

        res.status(200).send(user);

    } catch (err) {
        next(err)
    }
}

// login user
exports.login = async(req, res, next) => {
    try {
        let name = req.body.name;

        let user = await User.findOne({
            where: {
                name: name
            }
        })

        if (!user) {
            res.status(400).send('user not found!');
        } else {
            res.status(200).send(user);
        }

    } catch (err) {
        next(err);
    }
}