import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTrainer } from 'src/auth/decorators/get-trainer.decorator';
import { Trainer } from 'src/trainer/entities/trainer.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createClientDto: CreateClientDto,
    @GetTrainer() trainer: Trainer,
  ) {
    return this.clientService.create(createClientDto, trainer);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetTrainer() trainer: Trainer) {
    return this.clientService.findAll(trainer);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @GetTrainer() trainer: Trainer) {
    return this.clientService.findOne(id, trainer);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @GetTrainer() trainer: Trainer,
  ) {
    return this.clientService.update(id, updateClientDto, trainer);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @GetTrainer() trainer: Trainer) {
    return this.clientService.remove(id, trainer);
  }
}
