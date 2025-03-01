import mysql from 'mysql';
import queries from './queries/authqueries.js';
import sketchQueries from './queries/sketchesqueries.js';

// Env variable or default to localhost
const host = process.env.DB_HOST || 'localhost';

// Env variable or default to root
const user = process.env.DB_USER || ''; // Default user is root for local development

// Env variable or default to root
const password = process.env.DB_PASSWORD || ''; // Remove before pushing to production

// Env variable or default to sketchboxx
const database = process.env.DB_DATABASE || 'sketchboxxdb1'; // Default database is sketchboxx for local development

import query from './utils/query.js';
export default async (params) => {
    return new Promise(async (resolve, reject) => {
        const dbConnection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
        const userTableCreated = await query(dbConnection, queries.CREATE_USERS_TABLE).catch((err) => {reject(err)});
        const sketchesTableCreated = await query(dbConnection, sketchQueries.CREATE_SKETCHES_TABLE).catch((err) => {reject(err)});

        if(!!userTableCreated && !!sketchesTableCreated){
            console.log("Tables for users and sketches created or already exists.");
            resolve(dbConnection);
        };
    });
};
