import {DogBreed} from './models/Dog';
import {UserType} from './models/User';
import {DogRepository} from './repository/DogRepo';
import {PossessionRepository} from './repository/PossessionRepo';
import {UserRepository} from './repository/UserRepo';

export async function populateUser(userrepo: UserRepository) {
    const userInfo = {
        name: 'Lung Andreea',
        age: 20,
        email: 'andreealung2003@yahoo.com',
        password: '0000',
        type: UserType.user,
    };
    userrepo.addUser(userInfo);
}

export async function populateDatabaseDog(dogrepo: DogRepository) {
    const dogInfo1 = {
        name: 'Buddy',
        breed: DogBreed.BICHON,
        description: 'Buddy is a very friendly dog...',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bichon_Fris%C3%A9_-_studdogbichon.jpg/800px-Bichon_Fris%C3%A9_-_studdogbichon.jpg',
        age: 3,
        owner: 'John Smith',
    };
    dogrepo.addDog(dogInfo1);
    const dogInfo2 = {
        name: 'Charlie',
        breed: DogBreed.LABRADOR,
        description:
            'Charlie is a very active dog. He loves to play fetch and go for long walks.',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/640px-YellowLabradorLooking_new.jpg',
        age: 2,
        owner: 'Alice Johnson',
    };
    dogrepo.addDog(dogInfo2);
    const dogInfo3 = {
        name: 'Max',
        breed: DogBreed.HUSKY,
        description:
            'Max is a very energetic dog. He loves to run and play in the snow.',
        imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
        age: 4,
        owner: 'Michael Brown',
    };
    dogrepo.addDog(dogInfo3);
    const dogInfo4 = {
        name: 'Rocky',
        breed: DogBreed.PITBULL,
        description:
            'Rocky is a very loyal dog. He loves to protect his family and play with his toys.',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/d/d9/Ginger_December_3579836414e4b5ce786eoPitBull.jpg',
        age: 5,
        owner: 'Emily Davis',
    };
    dogrepo.addDog(dogInfo4);
    const dogInfo5 = {
        name: 'Golden',
        breed: DogBreed.GOLDEN_RETRIEVER,
        description:
            'Golden is a friendly and intelligent dog. He loves to retrieve objects and play outdoors.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/golden-retriever-detail-scaled.jpg',
        age: 3,
        owner: 'Christopher Wilson',
    };
    dogrepo.addDog(dogInfo5);
    const dogInfo6 = {
        name: 'Bernie',
        breed: DogBreed.BERNESE,
        description:
            'Bernie is a gentle giant. He loves being around people and enjoys outdoor activities.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/bernese-mountain-dog-card-large.jpg',
        age: 4,
        owner: 'Samantha Taylor',
    };
    dogrepo.addDog(dogInfo6);
    const dogInfo7 = {
        name: 'Max',
        breed: DogBreed.GERMAN_SHEPHERD,
        description:
            'Max is a loyal and intelligent dog. He excels in obedience training and enjoys being active.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/german-shepherd-dog-card-large.jpg',
        age: 5,
        owner: 'David Martinez',
    };
    dogrepo.addDog(dogInfo7);
    const dogInfo8 = {
        name: 'Coco',
        breed: DogBreed.CHIHUAHUA,
        description:
            'Coco is a small and feisty dog. Despite his size, he has a big personality and loves attention.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/chihuahua-card-large.jpg',
        age: 2,
        owner: 'Sarah Thompson',
    };
    dogrepo.addDog(dogInfo8);
    const dogInfo9 = {
        name: 'Spot',
        breed: DogBreed.DALMATIAN,
        description:
            'Spot is a playful and energetic dog. He enjoys running and playing games with his family.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/dalmatian-card-large.jpg',
        age: 3,
        owner: 'William Clark',
    };
    dogrepo.addDog(dogInfo9);
    const dogInfo10 = {
        name: 'Mochi',
        breed: DogBreed.CHOWCHOW,
        description:
            'Mochi is a fluffy and independent dog. He enjoys lounging around and getting pampered.',
        imageUrl:
            'https://www.petfinder.com/sites/default/files/images/content/chow-chow-card-large.jpg',
        age: 4,
        owner: 'Olivia Turner',
    };
    dogrepo.addDog(dogInfo10);
    const dogInfo11 = {
        name: 'Buddy',
        breed: DogBreed.BEAGLE,
        description:
            'Buddy is an affectionate and curious dog. He loves to follow scents and explore his surroundings.',
        imageUrl:
            'https://www.petfinder.com/static/7b7fc58b7acebd254e4beb127614b234/c32e2/beagle-card-large.jpg',
        age: 2,
        owner: 'James White',
    };
    dogrepo.addDog(dogInfo11);
}

export async function populateDatabasePossession(
    possrepo: PossessionRepository,
) {
    const possInfo1 = {
        dogId: 1,
        title: 'Favorite Toy',
        type: 'Toy',
        description: "Buddy's favorite toy",
        imageUrl: 'https://m.media-amazon.com/images/I/61iLNIUwPnL.jpg',
        instructions: 'Play with Buddy using this toy.',
    };
    possrepo.addPossession(possInfo1);
    const possInfo2 = {
        dogId: 2,
        title: 'Fetch Ball',
        type: 'Toy',
        description: "Charlie's favorite fetch ball",
        imageUrl:
            'https://companyofanimals.com/us/wp-content/uploads/sites/3/2020/08/Boomer-Ball_Unpacked-Blue-ball-Carousel_-694-x-572.jpg',
        instructions: 'Throw the ball for Charlie to fetch.',
    };
    possrepo.addPossession(possInfo2);
    const possInfo3 = {
        dogId: 3,
        title: 'Treat Dispenser',
        type: 'Other',
        description: "Max's treat dispenser",
        imageUrl: 'https://m.media-amazon.com/images/I/71b2nfzGWyL.jpg',
        instructions: 'Fill the dispenser with treats for Max.',
    };
    possrepo.addPossession(possInfo3);
    const possInfo4 = {
        dogId: 4,
        title: 'Pink Collar',
        type: 'Collar',
        description: "Rocky's collar",
        imageUrl: 'https://m.media-amazon.com/images/I/61HoBItCkQL.jpg',
        instructions: 'Put the collar on Rocky before going for a walk.',
    };
    possrepo.addPossession(possInfo4);
    const possInfo5 = {
        dogId: 5,
        title: 'Bed',
        type: 'Other',
        description: "Golden's comfortable bed",
        imageUrl:
            'https://m.media-amazon.com/images/I/71S4AwfqktS._AC_UF1000,1000_QL80_.jpg',
        instructions: 'Let Golden sleep in his bed at night.',
    };
    possrepo.addPossession(possInfo5);
    const possInfo6 = {
        dogId: 6,
        title: 'Leash',
        type: 'Other',
        description: "Bernie's leash",
        imageUrl:
            'https://m.media-amazon.com/images/I/61f8ZgaiQ-L._AC_UF1000,1000_QL80_.jpg',
        instructions: 'Use the leash when taking Bernie for a walk.',
    };
    possrepo.addPossession(possInfo6);
}
