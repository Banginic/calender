import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

//Load environment variables
dotenv.config()

// Get database URL from the .env
const databaseUrl = process.env.DATABASE_URL

// Throw an error if database doesn't exist
if(!databaseUrl){
    throw new Error('DATABASE_URL is not defined in .env');
}

// Export the Drizzle config using defineConfig helper.
export default defineConfig({
    // Path to your schema definitions
    schema: './drizzle/schema.ts',

    //Directory where drizzle with output migration files
    out: './drizzle/migrations',

    // Specify which SQL dialect you are using (e.g PostgreSQL, MySQL)
    dialect: 'postgresql',

    //Strict mode to enfore stricter validation and type safety
    strict: true,

    //Verbose logging to get more information during CLI actions
    verbose: true,

    //pass database credentials like connection URL
    dbCredentials: {
        url: databaseUrl
    }
})