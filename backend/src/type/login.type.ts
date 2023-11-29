import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    email: string = "";

    @Field()
    password: string = "";
}

@ObjectType()
export class LoginResponse {
    @Field(() => String, {nullable: true})
    id?: number;

    // @Field(() => String)
    // email?: string;

    // @Field(() => String)
    // firstName?: string;

    // @Field(() => String)
    // lastName?: string;

    @Field(() => String, {nullable: true}) 
    token?: string;
}