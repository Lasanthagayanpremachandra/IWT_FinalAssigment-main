const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");

let memoryServer;

const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "admin" });

        if (!adminExists) {
            await User.create({
                name: "Admin User",
                email: "admin@gmail.com",
                password: "123456",
                role: "admin",
            });

            console.log("Admin created: admin@gmail.com / 123456");
        } else {
            adminExists.role = "admin";
            adminExists.status = "active";
            await adminExists.save();
            console.log("Admin verified and active");
        }
    } catch (error) {
        console.error("Error initializing admin:", error.message);
    }
};

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI && process.env.MONGO_URI.trim();

        if (uri) {
            try {
                await mongoose.connect(uri);
                await mongoose.connection.db.admin().ping();
                console.log("MongoDB Connected");
                await initializeAdmin();
                return;
            } catch (atlasError) {
                console.warn("Atlas connection failed, retrying with local in-memory MongoDB:", atlasError.message);
                if (mongoose.connection.readyState !== 0) {
                    await mongoose.disconnect();
                }
            }
        }

        memoryServer = await MongoMemoryServer.create();
        const localUri = memoryServer.getUri();
        await mongoose.connect(localUri);
        await mongoose.connection.db.admin().ping();
        console.log("MongoDB Connected via local in-memory fallback");
        await initializeAdmin();
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;