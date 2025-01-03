import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'libs/entities/account/account.entity';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAccountDto } from 'libs/dtos/account/create-account.dto';
import { UpdateMoneyPointsDto } from 'libs/dtos/account/update-money-points-dto';
import moment from 'moment';

enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}

// Mapa de traducciones (inglés -> español)
const GenderTranslations: Record<Gender, string> = {
  [Gender.Male]: "Masculino",
  [Gender.Female]: "Femenino",
  [Gender.Other]: "Otro",
};

// Función para obtener el texto en español
function getGenderText(value: Gender): string {
  return GenderTranslations[value] || "Desconocido";
}

interface Profile {
  account: Account;
  userName: string;
  name: string
  gender: string
  birthday: Date
  age: number
}

@Injectable()
export class AccountAppService {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  async health(): Promise<string> {
    return 'Account Microservice is healthy - Casa mia!';
  }

  async createAccount(dto: CreateAccountDto): Promise<Account> {
    try {
      const findAccount = await this.accountRepository.findOneBy({ email: dto.email });
      if (findAccount) {
        throw new RpcException({
          statusCode: 400,
          message: 'Account already exists',
        });
      } else {
        const newAccount = this.accountRepository.create(dto);
        await this.accountRepository.save(newAccount);
        return newAccount;
      }

    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      if (error instanceof QueryFailedError) {
        throw new RpcException({
          statusCode: 500,
          message: error.message,
        });
      }
    }
  }

  async findAccountByEmail(email: string): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email });

      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }

      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }

  }

  async isProfileComplete(email: string): Promise<Profile | boolean> {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }

      if (account.name && account.birthday && account.userName && account.gender) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async updateUserName(email: string, userName: string): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }
      const isUserNameTaken = await this.accountRepository.findOneBy({ userName });

      if (isUserNameTaken) {
        throw new RpcException({
          statusCode: 400,
          message: 'Username already taken',
        });
      }

      account.userName = userName;
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async updateName(email: string, name: string): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }
      account.name = name;
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async sumPoints(email: string, points: number): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }
      account.points += points;
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async sumClp(email: string, clp: number): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }
      account.money += clp;
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }

  async findAllAccounts(): Promise<Account[]> {
    try {
      const accounts = await this.accountRepository.find();
      return accounts;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }


  async updateMoneyAndPoints( dto: UpdateMoneyPointsDto): Promise<Account> {
    try {
      const account = await this.accountRepository.findOneBy({ email: dto.email });
      if (!account) {
        throw new RpcException({
          statusCode: 404,
          message: 'Account not found',
        });
      }
      account.money += dto.money;
      account.points += dto.points;
      await this.accountRepository.save(account);
      return account;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
    }
  }
  
}





