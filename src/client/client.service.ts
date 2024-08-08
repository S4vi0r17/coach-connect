import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

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

  findOne(id: string, trainer: Trainer) {
    return this.clientModel.findOne({ _id: id, trainer });
  }

  async update(id: string, updateClientDto: UpdateClientDto, trainer: Trainer) {
    const client = await this.clientModel.findOne({ _id: id, trainer });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return await this.clientModel.findOneAndUpdate(
      { _id: id, trainer },
      updateClientDto,
      { new: true },
    );
  }

  async remove(id: string, trainer: Trainer) {
    const result = await this.clientModel.deleteOne({ _id: id, trainer });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return { message: 'Client deleted' };
  }
}
