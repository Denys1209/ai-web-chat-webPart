import { CreateImageAttachmentDto, GetImageAttachmentDto } from "./imageAttachmentTypes"

export enum Roles
{
    Unspecified = 0,
    System = 1,
    User = 2,
    Assistant = 3,
}



export interface GetMessageDto 
{
    id: string,
    text: string,
    thoughts: string,
    role: Roles
    imageAttachments: GetImageAttachmentDto[],

}

export interface CreateMessageDto 
{
    userId: string,
    text: string,
    thoughts: string,
    role: Roles
    imageAttachments: CreateImageAttachmentDto[],
}

