import { Module } from '@nestjs/common';
import { CypherController } from './cypher.controller';
import { CypherService } from './cypher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CypherEntity } from './cypher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CypherEntity])],
  controllers: [CypherController],
  providers: [CypherService],
})
export class CypherModule {}
