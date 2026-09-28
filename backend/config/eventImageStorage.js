const mongoose = require('mongoose');

const getBucket = () => new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'eventImages',
});

const storeEventImage = (file) => {
    const fileId = new mongoose.Types.ObjectId();
    const uploadStream = getBucket().openUploadStream(file.originalname, {
        id: fileId,
        metadata: { contentType: file.mimetype },
    });

    return new Promise((resolve, reject) => {
        uploadStream.once('error', reject);
        uploadStream.once('finish', () => resolve(`/uploads/${fileId.toString()}`));
        uploadStream.end(file.buffer);
    });
};

const findEventImage = async (fileId) => {
    if (!mongoose.isValidObjectId(fileId)) return null;

    const [file] = await getBucket()
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .limit(1)
        .toArray();

    return file || null;
};

const openEventImage = (fileId) => getBucket().openDownloadStream(new mongoose.Types.ObjectId(fileId));

module.exports = { findEventImage, openEventImage, storeEventImage };