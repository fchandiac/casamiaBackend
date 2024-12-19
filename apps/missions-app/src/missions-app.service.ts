import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from 'libs/entities/mission/mission.entity';
import { CreateMissionDto } from 'libs/dtos/missions/create-mission-dto';
import { CreateOneMissionDto } from 'libs/dtos/missions/create-one-mission-dto';

@Injectable()
export class MissionsAppService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,
  ) {}

  async health(): Promise<string> {
    return 'Missions Microservice is healthy';
  }

  async createMission(mission: Mission): Promise<Mission> {
    const newMission = this.missionRepository.create(mission);
    return this.missionRepository.save(newMission);
  }

  async findAllMissions(): Promise<Mission[]> {
    return this.missionRepository.find();
  }
  async findAllMissionsGroupByCode(): Promise<any> {
    return this.missionRepository
      .createQueryBuilder('mission')
      .select('mission.code')
      .addSelect('MAX(mission.name)', 'name') // Selecciona el nombre de la misión más reciente
      .addSelect('MAX(mission.description)', 'description')
      .addSelect('MAX(mission.money)', 'money')
      .addSelect('MAX(mission.points)', 'points')
      .where('mission.id IN (' + 
        this.missionRepository
          .createQueryBuilder('sub_mission')
          .select('MAX(sub_mission.id)')
          .where('sub_mission.code = mission.code')
          .getQuery() + 
        ')')
      .groupBy('mission.code')
      .getRawMany();
  }
  
  

  async createMissionDto(mission: CreateOneMissionDto): Promise<Mission> {
    const newMission = this.missionRepository.create(mission);
    return this.missionRepository.save(newMission);
  }

  async findMissionsByAccountId(accountId: string): Promise<Mission[]> {
    //@ts-ignore
    const {id} = accountId;
    return this.missionRepository.find({ where: { accountId: id } });
  }

  async findOneById(id: string): Promise<Mission> {
       //@ts-ignore
    const missionId = id.id
    const find =  this.missionRepository.findOne({ where: { id: missionId } });
    return find;
  }

  
  
}
