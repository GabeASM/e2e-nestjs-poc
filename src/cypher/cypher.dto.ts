export class CreateCypherRegisterDto{
    textEncrypted : string 
    keyWord : string
}

export class ReciveCypherDataDto{
    text: string 
    key: string 
    keyword: string
}

export class DecryptDataDto{
    encryptedText: string
    key: string 
}