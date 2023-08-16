/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    const isValidPassword = this.userService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    console.log(process.env.JWT_SECRET, process.env.EXPIRES_IN);

    try {
      console.log(typeof process.env.JWT_SECRET);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(userDTO: UserDTO) {
    return this.userService.create(userDTO);
  }
}