/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const sql = require('mssql/msnodesqlv8');

var config = {
    connectionString:
        'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-TK1OG7J\\SQLEXPRESS;Database=MppDb;Trusted_Connection=yes;',
};

async function getDogs() {
    console.log('getDogs');
    const pool = await sql.connect(config);
    console.log(pool);
    const result = await pool.request().query(`SELECT * FROM Dog`);
    console.log(result);
    await pool.close();
    return result.recordset;
}
const getAllDogs = async (req, res) => {
    const DOGS = await getDogs();
    res.send(DOGS);
};

async function getRowCount() {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .query(`SELECT COUNT(*) as rCount FROM Dog`);
        const rows = result.recordset[0];
        await sql.close();
        return rows.rCount;
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    }
}
async function getDogByIDAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`SELECT * FROM Dog WHERE Did = '${id}'`);
    await pool.close();
    return result.recordset;
}

const getDogByID = async (req, res) => {
    const requestID = req.params.id;

    var dog = await getDogByIDAsync(requestID);
    if (!dog) res.status(404).json('No record with given ID');

    res.send(dog);
};

async function addDog(
    id,
    newName,
    newBreed,
    newDescription,
    newImageUrl,
    newAge,
    newOwner,
) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `INSERT INTO Dog (Did, nameD, breed, descriptionD, imageUrl, age, ownerD) VALUES('${id}', '${newName}', '${newBreed}', '${newDescription}','${newImageUrl}','${newAge}','${newOwner}')`,
        );
    await pool.close();
    return result.rowsAffected;
}

const createDog = async (req, res) => {
    var id = await getRowCount();
    const item = req.body;
    if (item.nameD == '') {
        console.error('Error creating the dog name');
        return;
    }
    if (item.breed == '') {
        console.error('Error creating the dog breed');
        return;
    }
    if (item.descriptionD == '') {
        console.error('Error creating the dog descriptionD');
        return;
    }
    if (item.imageUrl == '') {
        console.error('Error creating the dog imageUrl');
        return;
    }
    if (isNaN(Number(item.Age)) || Number(item.Age) < 0) {
        console.error('Error creating the dog age');
        return;
    }
    if (item.ownerD == '') {
        console.error('Error creating the dog owner');
        return;
    }
    try {
        const result = await dogAlreadyExists(
            id,
            item.nameD,
            item.breed,
            Number(item.Age),
        );
        if (result == true) {
            console.error('Error creating the dog');
            return;
        }
    } catch (error) {
        console.error('Error retrieving dogs.', error);
        return;
    }
    try {
        await addDog(
            Number(id),
            item.nameD,
            item.breed,
            item.descriptionD,
            item.imageUrl,
            Number(item.Age),
            item.ownerD,
        );
    } catch (error) {
        console.error('Error retrieving dogs', error);
        return;
    }
    res.send();
};

async function updateDog(
    id,
    newName,
    newBreed,
    newDescription,
    newImageUrl,
    newAge,
    newOwner,
) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `UPDATE Dog SET nameD = '${newName}', breed = '${newBreed}', descriptionD = '${newDescription}', imageUrl = '${newImageUrl}', age = '${newAge}', ownerD = '${newOwner}' WHERE Did = '${id}'`,
        );
    await pool.close();
    return result.rowsAffected;
}

async function dogAlreadyExists(id, name, breed, age) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `SELECT * FROM Dog WHERE nameD = '${name}' AND breed = '${breed}' AND Did != '${id}' AND age =${age}`,
        );
    await pool.close();
    return result.recordset.length != 0;
}

async function dogNotExists(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`SELECT * FROM Dog WHERE Did = '${id}'`);
    await pool.close();
    return result.recordset.length == 0;
}

const editDog = async (req, res) => {
    const item = req.body;
    if (isNaN(item.Did) || item.Did < 0) {
        console.error('Error updating the dog');
        return;
    }
    if (item.nameD == '') {
        console.error('Error updating the dog name');
        return;
    }
    if (item.breed == '') {
        console.error('Error updating the dog breed');
        return;
    }
    if (item.descriptionD == '') {
        console.error('Error updating the dog descriptionD');
        return;
    }
    if (item.imageUrl == '') {
        console.error('Error updating the dog imageUrl');
        return;
    }
    if (isNaN(Number(item.Age)) || Number(item.Age) < 0) {
        console.error('Error updating the dog age');
        return;
    }
    if (item.ownerD == '') {
        console.error('Error updating the dog owner');
        return;
    }
    try {
        const result = await dogAlreadyExists(
            item.Did,
            item.nameD,
            item.breed,
            Number(item.Age),
        );
        if (result == true) {
            console.error('Error updating the dog');
            return;
        }
    } catch (error) {
        console.error('Error retrieving dogs.', error);
        return;
    }
    try {
        const result = await dogNotExists(Number(item.Did));
        if (result == true) {
            console.error('Error updating the dog');
            return;
        }
    } catch (error) {
        console.error('Error retrieving dogs', error);
        return;
    }
    try {
        await updateDog(
            Number(item.Did),
            item.nameD,
            item.breed,
            item.descriptionD,
            item.imageUrl,
            Number(item.age),
            item.ownerD,
        );
    } catch (error) {
        console.error('Error retrieving dogs', error);
        return;
    }
    const result = await getDogs();
    res.send(result);
};

async function deleteDogAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`DELETE FROM Dog WHERE Did = ${id}`);
    await pool.close();
    return result.rowsAffected;
}

const deleteDog = async (req, res) => {
    try {
        const aux = await deleteDogAsync(Number(req.params.id));
        const result = await getDogs();
        if (aux == 0) {
            console.error('Error deleting the dog');
        }
        res.status(200).send(result);
    } catch (error) {
        console.error('Error deleting dog.', error);
    }
};

module.exports = {
    getAllDogs,
    getDogByID,
    createDog,
    editDog,
    deleteDog,
};
