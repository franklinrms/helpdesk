export interface IMessage {
    id?: string;
    message: string;
    userId: string;
    requestId: string;
    createdAt?: Date;
}

export interface IRequest {
    id?: string;
    title: string;
    status: string;
    createdAt?: Date;
    customer?: {
        name: string;
        id: string;
    };
    messages?: IMessage[];

}
