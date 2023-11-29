import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../entities/user";
import * as UserService from '../services/user.service'
import { UserInput } from "../type/user.type";
import { LoginInput, LoginResponse } from "../type/login.type";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    getUsers(): Promise<User[]>{
        return UserService.getUsers();
    }

    @Query(() => User)
    getOneUser(@Arg("id") id: number): Promise<User | null>{
        return UserService.getUserById(id);
    }

    @Mutation(() => User)
    signUp(@Arg("user") user: UserInput): Promise<User>{
        return UserService.signUp(user);
    }

    @Mutation(() => LoginResponse)
    login(@Arg("user") user: LoginInput): Promise<LoginResponse | String>{
        return UserService.login(user);
    }

    @Mutation(() => String)
    deleteUser(@Arg("id") id: number): Promise<String>{
        return UserService.deleteUser(id);
    }
}