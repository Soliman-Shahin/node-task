const NoteType = require('../models/noteType.model');

// find all note types
exports.findAll = async(req, res, next) => {
    try {

        let page = +req.query.page || 1, // page
            limit = +req.query.limit || 10, // limit
            offset = ((page - 1) * limit) || 0, // skip
            order = +req.query.order || ['createdAt', 'desc']; // sort

        let noteTypes = await NoteType.findAll({ page: page, limit: limit, offset: offset, order: [order] })

        let count = await NoteType.findAll();

        let totalCount = count.length;

        const pageCount = Math.ceil(totalCount / limit);

        res.status(201).send({ data: noteTypes, total: totalCount, pageCount: pageCount, limit: limit, page: page });
    } catch (err) {
        next(err);
    }
}

// create noteType
exports.create = async(req, res, next) => {
    try {

        let createdNoteType = await NoteType.create({
            name: req.body.name
        });

        res.status(201).send(createdNoteType);

    } catch (err) {
        next(err);
    }
};

// find by id
exports.findById = async(req, res, next) => {
    try {
        let typeId = req.params.id;

        let type = await NoteType.findOne({ where: { id: typeId } })

        res.status(200).send(type);

    } catch (err) {
        next(err);
    }
};

// update note type
exports.update = async(req, res, next) => {
    try {
        let typeId = req.params.id;

        let type = await NoteType.findOne({ where: { id: typeId } })

        await type.update({
            name: req.body.name,
            disabled: req.body.disabled
        })

        res.status(200).send(type);

    } catch (err) {
        next(err);
    }
}

// delete note type
exports.delete = async(req, res, next) => {
    try {
        let typeId = req.params.id;

        let type = await NoteType.findOne({ where: { id: typeId } })

        await type.update({
            deleted: true
        })

        res.status(200).send(type);

    } catch (err) {
        next(err);
    }
}