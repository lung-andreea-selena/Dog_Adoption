/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const {
    getAllPossession,
    getPossessionByID,
    createPossession,
    editPossession,
    deletePossession,
} = require('./yourFileContainingFunctions');

jest.mock('mssql/msnodesqlv8', () => ({
    connect: jest.fn().mockResolvedValue({
        request: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({recordset: []}),
        close: jest.fn().mockResolvedValue(),
    }),
}));

const reqMock = {
    params: {id: 'example_id'},
    body: {
        dogId: 1,
        title: 'Example Title',
        typeP: 'Example Type',
        descriptionP: 'Example Description',
        imageUrl: 'example.com/image.jpg',
        instructions: 'Example Instructions',
        Pid: 1,
    },
};

const resMock = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};

describe('getAllPossession', () => {
    it('should send all possessions', async () => {
        await getAllPossession(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('getPossessionByID', () => {
    it('should send the possession with the given ID', async () => {
        await getPossessionByID(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('createPossession', () => {
    it('should create a new possession', async () => {
        await createPossession(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('editPossession', () => {
    it('should edit the possession with the given ID', async () => {
        await editPossession(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('deletePossession', () => {
    it('should delete the possession with the given ID', async () => {
        await deletePossession(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});
