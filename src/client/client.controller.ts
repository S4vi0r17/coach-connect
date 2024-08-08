import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
