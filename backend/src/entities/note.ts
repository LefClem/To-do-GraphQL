import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    idNote!: number;

    @Column()
    @Field()
    text?: string;

    @Column()
    @Field()
    date?: Date;

    @ManyToOne(() => User, user => user.notes)
    user?: User[];
}