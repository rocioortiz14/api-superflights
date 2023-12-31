/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';

@Injectable()
export class UserService {  
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>){}

    async checkPassword(password: string, passwordDb: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordDb);
    }
    async findByUsername(username: string){
        return await this.model.findOne({ username});
    }

    async hashPassword(password:string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    }

    async create(userDTO:UserDTO): Promise<IUser>{
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
    }

    async findAll(): Promise<IUser[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IUser> {
        return await this.model.findById(id);
    }

    async update(id: string, userDto: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDto.password);
        const user = { ...userDto, password: hash };
        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK,msg:'Delete'}
    }

}
