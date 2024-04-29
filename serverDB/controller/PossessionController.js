/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const sql = require('mssql/msnodesqlv8');

var config = {
    connectionString:
        'Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-TK1OG7J\\SQLEXPRESS;Database=MppDb;Trusted_Connection=yes;',
};

async function getPossession() {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM Possession`);
    await pool.close();
    return result.recordset;
}
const getAllPossession = async (req, res) => {
    const POSSESSIONS = await getPossession();
    res.send(POSSESSIONS);
};

async function getRowCount() {
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .query(`SELECT COUNT(*) as rCount FROM Possession`);
        const rows = result.recordset[0];
        await sql.close();
        return rows.rCount;
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    }
}
async function getPossessionByIDAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`SELECT * FROM Possession WHERE Pid = '${id}'`);
    await pool.close();
    return result.recordset;
}

const getPossessionByID = async (req, res) => {
    const requestID = req.params.id;

    var possession = await getPossessionByIDAsync(requestID);
    if (!possession) res.status(404).json('No record with given ID');

    res.send(possession);
};

async function addPossession(
    id,
    newDogId,
    newTitle,
    newTypeP,
    newDescription,
    newImageUrl,
    newInstructions,
) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `INSERT INTO Possession (Pid, dogId, title, typeP, descriptionP, imageUrl, instructions) VALUES('${id}', '${newDogId}', '${newTitle}', '${newTypeP}','${newDescription}','${newImageUrl}','${newInstructions}')`,
        );
    await pool.close();
    return result.rowsAffected;
}

const createPossession = async (req, res) => {
    var id = await getRowCount();
    const item = req.body;
    if (isNaN(Number(item.dogId)) || Number(item.dogId) < 0) {
        console.error('Error creating the dog age');
        return;
    }
    if (item.title == '') {
        console.error('Error creating the possession title');
        return;
    }
    if (item.typeP == '') {
        console.error('Error creating the possession type');
        return;
    }
    if (item.descriptionP == '') {
        console.error('Error creating the possession description');
        return;
    }
    if (item.imageUrl == '') {
        console.error('Error creating the possession image');
        return;
    }
    if (item.instructions == '') {
        console.error('Error creating the possession instructions');
        return;
    }
    try {
        const result = await possessionAlreadyExists(
            id,
            Number(item.dogId),
            item.typeP,
        );
        if (result == true) {
            console.error('Error creating the possession');
            return;
        }
    } catch (error) {
        console.error('Error retrieving possessions.', error);
        return;
    }
    try {
        await addPossession(
            Number(id),
            Number(dogId),
            item.title,
            item.typeP,
            item.descriptionP,
            item.imageUrl,
            item.instructions,
        );
    } catch (error) {
        console.error('Error retrieving possessions', error);
        return;
    }
    res.send();
};

async function updatePossession(
    id,
    newDogId,
    newTitle,
    newTypeP,
    newDescription,
    newImageUrl,
    newInstructions,
) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `UPDATE Possession SET dogId = '${newDogId}', title = '${newTitle}', typeP = '${newTypeP}', descriptionP = '${newDescription}', imageUrl = '${newImageUrl}', instructions = '${newInstructions}', WHERE Pid = '${id}'`,
        );
    await pool.close();
    return result.rowsAffected;
}

async function possessionAlreadyExists(id, dogId, typeP) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(
            `SELECT * FROM Possession WHERE dogId = '${dogId}' AND typeP = '${typeP}' AND Pid != '${id}'`,
        );
    await pool.close();
    return result.recordset.length != 0;
}

async function possessionNotExists(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`SELECT * FROM Possession WHERE Did = '${id}'`);
    await pool.close();
    return result.recordset.length == 0;
}

const editPossession = async (req, res) => {
    const item = req.body;
    if (isNaN(item.Pid) || item.Pid < 0) {
        console.error('Error updating the possession');
        return;
    }
    if (isNaN(Number(item.dogId)) || Number(item.dogId) < 0) {
        console.error('Error updating the dog id');
        return;
    }
    if (item.title == '') {
        console.error('Error updating the possession title');
        return;
    }
    if (item.typeP == '') {
        console.error('Error updating the type');
        return;
    }
    if (item.descriptionP == '') {
        console.error('Error updating the possession description');
        return;
    }
    if (item.imageUrl == '') {
        console.error('Error updating the possession imgUrl');
        return;
    }
    if (item.instructions == '') {
        console.error('Error updating the possession instruction');
        return;
    }
    try {
        const result = await possessionAlreadyExists(
            item.Pid,
            Number(item.dogId),
            item.typeP,
        );
        if (result == true) {
            console.error('Error updating the possession');
            return;
        }
    } catch (error) {
        console.error('Error retrieving possessions.', error);
        return;
    }
    try {
        const result = await possessionNotExists(Number(item.Pid));
        if (result == true) {
            console.error('Error updating the possession');
            return;
        }
    } catch (error) {
        console.error('Error retrieving possessions', error);
        return;
    }
    try {
        await updatePossession(
            Number(item.Pid),
            Number(item.dogId),
            item.title,
            item.typeP,
            item.descriptionP,
            item.imageUrl,
            item.instructions,
        );
    } catch (error) {
        console.error('Error retrieving possessions', error);
        return;
    }
    const result = await getPossession();
    res.send(result);
};

async function deletePossessionAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool
        .request()
        .query(`DELETE FROM Possession WHERE Pid = ${id}`);
    await pool.close();
    return result.rowsAffected;
}

const deletePossession = async (req, res) => {
    try {
        const aux = await deletePossessionAsync(Number(req.params.id));
        const result = await getPossession();
        if (aux == 0) {
            console.error('Error deleting the possesion');
        }
        res.status(200).send(result);
    } catch (error) {
        console.error('Error deleting possession.', error);
    }
};

module.exports = {
    getAllPossession,
    getPossessionByID,
    createPossession,
    editPossession,
    deletePossession,
};
