import { User } from "../entities/user";
import { UserInput } from "../type/user.type";
import { LoginInput, LoginResponse } from "../type/login.type";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function getUsers(): Promise<User[]> {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function signUp(user: UserInput): Promise<User> {
  try {
    const newUser = User.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    return newUser.save();
  } catch (error) {
    throw error;
  }
}

export async function login(user: LoginInput): Promise<LoginResponse | String> {
  try {
    const login = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (login?.email == undefined) {
      return "Cette adresse mail n'est rattachée à aucun compte !";
    } else {
      const valid = await bcrypt.compare(user.password, login?.password);
      if (!valid) {
        return "Connexion échouée";
      } else {
        const user: LoginResponse = {
          id: login.id,
          // firstName: login.firstName,
          // lastName: login.lastName,
          // email: login.email,
          token: jwt.sign(
            {
              id: login.id,
            },
            'jiopzhihUIZHUIP289Phuhhs!éç)usjépç&usju!ps&!s!j!sç)a!dç)y!prtè!àétahd!çà"y',
            { expiresIn: "2h" }
          )
        };

        return user;
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: number): Promise<String> {
  try {
    const result = await User.delete(id);
    if (result.affected === 0) {
      return "Cet utilisateur n'existe pas";
    } else {
      return "Utilisateur supprimé !";
    }
  } catch (error) {
    throw error;
  }
}
