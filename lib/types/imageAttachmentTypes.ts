export interface GetImageAttachmentDto 
{
    id: string,
    url: string,
    mimeType: string
}

export interface CreateImageAttachmentDto 
{
    data: string,
    mimeType: string
}

export async function fileToImageAttachmentDto(file: File): Promise<CreateImageAttachmentDto> {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // Convert to base64 (works for both small and reasonably large files)
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return {
        data: base64,
        mimeType: file.type
    };
}