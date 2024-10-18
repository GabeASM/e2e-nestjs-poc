import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('encrypted_register')
export class CypherEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    textEncrypted: string

    @Column()
    kerWord: string
    
}