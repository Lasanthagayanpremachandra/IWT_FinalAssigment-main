const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");

let memoryServer;
let connectionPromise;

const initializeAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || (process.env.NODE_ENV === 'production' ? null : 'admin@gmail.com');
        const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? null : '123456');
        let admin = adminEmail ? await User.findOne({ email: adminEmail }).select('+password') : null;
        if (!admin) admin = await User.findOne({ role: 'admin' }).select('+password');

        if (!admin) {
            if (!adminEmail || !adminPassword) {
                console.warn('Admin creation skipped. Configure ADMIN_EMAIL and ADMIN_PASSWORD to seed an admin.');
                return;
            }

            await User.create({
                name: "Admin User",
                email: adminEmail,
                password: adminPassword,
                role: "admin",
            });

            console.log('Admin account initialized');
            return;
        }

        admin.role = 'admin';
        admin.status = 'active';
        if (adminEmail) admin.email = adminEmail;
        if (adminPassword && !(await admin.matchPassword(adminPassword))) {
            admin.password = adminPassword;
        }
        if (admin.isModified()) await admin.save();
        console.log('Admin account verified');
    } catch (error) {
        console.error("Error initializing admin:", error.message);
    }
};

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    if (connectionPromise) return connectionPromise;

    const uri = process.env.MONGO_URI && process.env.MONGO_URI.trim();
    if (!uri) throw new Error('MONGO_URI is missing. Configure it in the backend environment.');

    connectionPromise = (async () => {
        try {
            try {
                await mongoose.connect(uri, {
                    maxPoolSize: 5,
                    minPoolSize: 0,
                    maxIdleTimeMS: 10000,
                });
                await mongoose.connection.db.admin().ping();
                console.log('MongoDB Connected to Atlas');
                await initializeAdmin();
            } catch (atlasError) {
                if (process.env.USE_LOCAL_DB !== 'true') {
                    throw atlasError;
                }

                console.warn('Atlas connection failed, retrying with local in-memory MongoDB:', atlasError.message);
                if (mongoose.connection.readyState !== 0) {
                    await mongoose.disconnect();
                }

                memoryServer = await MongoMemoryServer.create();
                await mongoose.connect(memoryServer.getUri());
                await mongoose.connection.db.admin().ping();
                console.log('MongoDB Connected via local in-memory fallback');
                await initializeAdmin();
            }
        } catch (error) {
            console.error('Database connection failed:', error.message);
            throw error;
        } finally {
            connectionPromise = undefined;
        }
    })();

    return connectionPromise;
};

module.exports = connectDB;