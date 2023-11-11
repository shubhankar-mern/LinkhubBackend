/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex)=> {
    await knex.raw('CREATE TABLE userlinkhub (\
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\
        email VARCHAR(100) NOT NULL,\
        password VARCHAR(100) NOT NULL,\
        name VARCHAR(100) NOT NULL,\
        linkcards JSONB [],\
        image_url VARCHAR(100) ,\
        linkedin_url VARCHAR(100) ,\
        instagram_url VARCHAR(100) ,\
        youtube_url VARCHAR(100) ,\
        twitter_url VARCHAR(100) ,\
        facebook_url VARCHAR(100) ,\
        shortbio VARCHAR(100) ,\
        linkhub_id VARCHAR(100) ,\
        updated_at TIMESTAMP DEFAULT current_timestamp,\
        created_at TIMESTAMP DEFAULT current_timestamp\
    )');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex)=> {
    await knex.schema.dropTableIfExists('a');
};
