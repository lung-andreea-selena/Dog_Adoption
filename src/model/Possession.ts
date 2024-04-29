export interface Possession {
    Pid: number;
    dogId: number;
    title: string;
    type: PossessionType;
    description: string;
    imageUrl: string;
    instructions: string;
}

export enum PossessionType {
    TOY = 'Toy',
    CLOTHING = 'Clothing',
    COLLAR = 'Collar',
    OTHER = 'Other',
}
