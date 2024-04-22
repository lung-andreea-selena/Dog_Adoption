import {ConnectionPool, config} from 'mssql';

// Define the connection configuration
const connectionConfig: config = {
    server: 'DESKTOP-TK1OG7J\\SQLEXPRESS',
    database: 'MppDb',
    options: {
        trustedConnection: true,
    },
};

// Create a global variable to hold the connection pool
let connectionPool: ConnectionPool | undefined;

// Function to connect to the database
export const connectDB = async () => {
    try {
        // Create a new connection pool if it doesn't exist
        if (!connectionPool) {
            connectionPool = await new ConnectionPool(
                connectionConfig,
            ).connect();
        }
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

// Function to close the database connection
export const closeDB = async () => {
    try {
        // Close the connection pool if it exists
        if (connectionPool) {
            await connectionPool.close();
            console.log('Database connection closed.');
            // Set connectionPool to undefined after closing
            connectionPool = undefined;
        }
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
};

export default {connectDB, closeDB};
