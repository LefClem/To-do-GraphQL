import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./note";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id!: number;

    @Column()
    @Field()
    firstName?: string;

    @Column()
    @Field()
    lastName?: string;

    @Column()
    @Field()
    email!: string;

    @Column()
    @Field()
    password!: string;

    @OneToMany(() => Note, note => note.user)
    notes?: Note[];
}