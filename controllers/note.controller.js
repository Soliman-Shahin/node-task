const Note = require('../models/note.model');
const Notif = require('../models/notif.model');
const { Op } = require('sequelize')


// find all notes
exports.findAll = async(req, res, next) => {
    try {

        let page = +req.query.page || 1, // page
            limit = +req.query.limit || 10, // limit
            offset = ((page - 1) * limit) || 0, // skip
            order = +req.query.order || ['createdAt', 'desc']; // sort

        let notes = await Note.findAll({ page: page, limit: limit, offset: offset, order: [order] })

        let count = await Note.findAll();

        let totalCount = count.length;

        const pageCount = Math.ceil(totalCount / limit);

        res.status(201).send({ data: notes, total: totalCount, pageCount: pageCount, limit: limit, page: page });
    } catch (err) {
        next(err);
    }
}

// create note and notification
exports.create = async(req, res, next) => {
    try {

        // let { files } = req.files
        let files = req.file;

        const note = new Note()
        note.title = req.body.title;
        note.message = req.body.message;
        note.userId = req.body.userId;
        note.noteTypeId = req.body.noteTypeId;
        note.files = files.filename;

        // for (let i = 0; i <= files.length; i++) {
        //     if (files[i] !== undefined) {
        //         note.files = files[i].filename;
        //     }
        // }

        let createdNote = await note.save();

        const notif = new Notif()
        notif.userId = createdNote.userId;
        notif.noteId = createdNote.id

        let createdNotif = await notif.save();

        res.status(201).send({ note: createdNote, notif: createdNotif });

    } catch (err) {
        next(err);
    }
};

// find by id
exports.findById = async(req, res, next) => {
    try {
        let noteId = req.params.id;

        let note = await Note.findOne({ where: { id: noteId } })

        res.status(200).send(note);

    } catch (err) {
        next(err);
    }
};

// update note
exports.update = async(req, res, next) => {
    try {
        let noteId = req.params.id;

        let note = await Note.findOne({ where: { id: noteId } })

        await note.update({
            title: req.body.title,
            message: req.body.message,
            files: req.file.filename,
        })

        res.status(200).send(note);

    } catch (err) {
        next(err);
    }
}

// delete note
exports.delete = async(req, res, next) => {
    try {
        let noteId = req.params.id;

        let = await Note.findOne({ where: { id: noteId } })

        await note.update({
            deleted: true
        })

        res.status(200).send(note);

    } catch (err) {
        next(err);
    }
}

// get user notifs in the last 30 days
exports.getNotif = async(req, res, next) => {
    try {

        let userId = req.params.userId;

        let page = +req.query.page || 1, // page
            limit = +req.query.limit || 10, // limit
            offset = ((page - 1) * limit) || 0, // skip
            order = +req.query.order || ['createdAt', 'desc'], // sort
            filter = +req.query.filter || '';

        let today = new Date();

        let priorDate = new Date(new Date().setDate(today.getDate() - 30));

        let notifs = await Notif.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.gte]: priorDate
                }
            },
            page: page,
            limit: limit,
            offset: offset,
            order: [order],
            filter: filter
        })

        let count = await Notif.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.gte]: priorDate
                }
            }
        });

        let totalCount = count.length;

        const pageCount = Math.ceil(totalCount / limit);

        res.status(200).send({ data: notifs, total: totalCount, pageCount: pageCount, limit: limit, page: page });
    } catch (err) {
        next(err);
    }
}

// user delete one or all his received notifs
exports.deleteNotif = async(req, res, next) => {
    try {
        let id = req.params.id
        let userId = req.params.userId;

        if (!id) {
            let notif = await Notif.findAll({
                where: {
                    userId: userId,
                    deleted: false
                }
            })

            for (let i = 0; i <= notif.length; i++) {
                if (notif[i]) {
                    await notif[i].update({
                        deleted: true
                    })
                }
            }

        } else {
            let notif = await Notif.findOne({
                where: {
                    id: id,
                    userId: userId,
                    deleted: false
                }
            })

            await notif.update({
                deleted: true
            })
        }

        res.status(200).send('notif deleted successfully');
    } catch (err) {
        next(err);
    }
}