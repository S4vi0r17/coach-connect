import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Client } from './entities/client.entity';
import { Trainer } from '../trainer/entities/trainer.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    private readonly authService: AuthService,
  ) {}

  async create(createClientDto: CreateClientDto, trainer: Trainer) {
    const createdClient = new this.clientModel(createClientDto);

    createdClient.trainer = trainer._id.toString();

    try {
      return await createdClient.save();
    } catch (error) {
      console.log(error);
    }
  }

  findAll(trainer: Trainer) {
    // return this.clientModel.find({ trainer: trainer._id });
    return this.clientModel.find().where('trainer').equals(trainer);
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
