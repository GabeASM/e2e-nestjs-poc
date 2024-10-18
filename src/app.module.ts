import { Module } from '@nestjs/common';
import { CypherModule } from './cypher/cypher.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres14-encryption',
    port: 5432,
    username: 'postgres',
    password: 'postgres-encrypted',
    database: 'e2epoc',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),CypherModule],
})
export class AppModule {}
