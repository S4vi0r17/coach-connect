import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './entities/client.entity';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async addClient(coachId: string, createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create({
        ...createClientDto,
        coachId,
      });

      return client;
    } catch (error) {
      this.handleException(error);
    }
  }

  async getAllClients(coachId: string) {
    try {
      // const clients = await this.clientModel.find({ coachId }).exec();
      const clients = await this.clientModel
        .find()
        .where('coachId')
        .equals(coachId);

      return clients;
    } catch (error) {
      this.handleException(error);
    }
  }

  async getClientById(coachId: string, id: string) {
    const client = await this.clientModel.findOne({ _id: id, coachId }).exec();

    if (!client) {
      throw new BadRequestException(
        `Client with id ${id} not found for coach ${coachId}`,
      );
    }

    return client;
  }

  async modifyClient(
    coachId: string,
    id: string,
    updateClientDto: UpdateClientDto,
  ) {
    try {
      const client = await this.clientModel.findOneAndUpdate(
        { _id: id, coachId },
        { $set: updateClientDto },
        { new: true },
      );

      return client;
    } catch (error) {
      this.handleException(error);
    }
  }

  async deleteClient(coachId: string, id: string) {
    const client = await this.clientModel
      .findOneAndDelete({ _id: id, coachId })
      .exec();

    if (!client) {
      throw new BadRequestException(
        `Client with id ${id} not found for coach ${coachId}`,
      );
    }

    return client;
  }

  private hasCode(
    error: unknown,
  ): error is { code: number; keyValue?: { [key: string]: any } } {
    return typeof error === 'object' && error !== null && 'code' in error;
  }

  private handleException(error: unknown) {
    if (this.hasCode(error) && error.code === 11000) {
      throw new BadRequestException(
        `Client with email ${error.keyValue?.email ?? 'unknown'} already exists`,
      );
    }

    Logger.error(
      error,
      'ClientsService',
      'handleException',
      'Error while creating client',
    );

    throw new InternalServerErrorException(
      `Can't create Client - Check server logs`,
    );
  }
}
