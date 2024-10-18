import { BadRequestException, Injectable } from '@nestjs/common';
import { CypherEntity } from './cypher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DecryptDataDto, ReciveCypherDataDto } from './cypher.dto';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CypherService {
    constructor(@InjectRepository(CypherEntity) private readonly cypherRepo: Repository<CypherEntity>) { }

    async encryptText(dataRecived: ReciveCypherDataDto) {
        const encryptedText = CryptoJS.Blowfish.encrypt(dataRecived.text, dataRecived.key).toString()
        const newCypher = this.cypherRepo.create({ textEncrypted: encryptedText, kerWord: dataRecived.keyword });
        await this.cypherRepo.save(newCypher);
        return { encryptedText: encryptedText }
    }

    decryptText(decryptData: DecryptDataDto) {
        try {
            const decryptedText = CryptoJS.Blowfish.decrypt(decryptData.encryptedText, decryptData.key).toString(CryptoJS.enc.Utf8);
            
            if (!decryptedText) {
                throw new Error("Decryption resulted in an empty string"); 
            }           
            return { decryptedText };
        } catch (error) {
            throw new BadRequestException('Failed to decrypt text. Please check the encrypted text and key.');
        }
    }

    async getAllEncryptedText() {
        return this.cypherRepo.find();
    }
}
