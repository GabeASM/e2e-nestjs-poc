import { Body, Controller, Get, Post } from '@nestjs/common';
import { CypherService } from './cypher.service';
import { DecryptDataDto, ReciveCypherDataDto } from './cypher.dto';

@Controller('cypher')
export class CypherController {

    constructor(private readonly cypherService : CypherService){}

    @Get()
    getAllData(){
        return this.cypherService.getAllEncryptedText();
    }

    @Post('/encrypt')
    encryptText(@Body() data: ReciveCypherDataDto){
        return this.cypherService.encryptText(data);
    }

    @Post('/decrypt')
    decryptText(@Body() data: DecryptDataDto){
        return this.cypherService.decryptText(data);
    }
}
