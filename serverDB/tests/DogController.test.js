/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const {
    getAllDogs,
    getDogByID,
    createDog,
    editDog,
    deleteDog,
} = require('../controller/DogController');

jest.mock('mssql/msnodesqlv8', () => ({
    connect: jest.fn().mockResolvedValue({
        request: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({recordset: []}),
        close: jest.fn().mockResolvedValue(),
    }),
}));

const reqMock = {
    params: {id: '133'},
    body: {
        nameD: 'Alpha',
        breed: 'Husky',
        descriptionD: 'asdfgjhjnbv',
        imageUrl:
            'https://thumbs.dreamstime.com/b/beagle-dog-isolated-white-background-purebred-103538194.jpg',
        Age: 5,
        ownerD: 'Armando',
        Did: 1,
    },
};

const resMock = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};

describe('getAllDogs', () => {
    it('should send all dogs', async () => {
        await getAllDogs(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('getDogByID', () => {
    it('should send the dog with the given ID', async () => {
        await getDogByID(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('createDog', () => {
    it('should create a new dog', async () => {
        await createDog(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('editDog', () => {
    it('should edit the dog with the given ID', async () => {
        await editDog(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});

describe('deleteDog', () => {
    it('should delete the dog with the given ID', async () => {
        await deleteDog(reqMock, resMock);
        expect(resMock.send).toHaveBeenCalled();
    });
});
