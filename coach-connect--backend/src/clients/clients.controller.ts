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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetCoach } from 'src/auth/decorators/get-coach.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(AuthGuard)
  @Post()
  addClient(
    @GetCoach('coachId') coachId: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.clientsService.addClient(coachId, createClientDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllClients(@GetCoach('coachId') coachId: string) {
    return this.clientsService.getAllClients(coachId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getClientById(@GetCoach('coachId') coachId: string, @Param('id') id: string) {
    return this.clientsService.getClientById(coachId, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyClient(
    @GetCoach('coachId') coachId: string,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.modifyClient(coachId, id, updateClientDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteClient(@GetCoach('coachId') coachId: string, @Param('id') id: string) {
    return this.clientsService.deleteClient(coachId, id);
  }
}
