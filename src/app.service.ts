import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello everyone';
  }

  getGoodBye(): string {
    return 'Good bye';
  }
}
