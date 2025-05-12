
import { Controller, Get, Inject } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Controller('users')
export class UsersController {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Get('list')
  async getUsers() {
    try {
      const pool = this.databaseService.getPool();
      const result = await pool.request().query('SELECT * FROM users');
      return result.recordset; // Return the list of users from the database
    } catch (error) {
      console.error('Error fetching users:', error);
      return { message: 'Error fetching users' };
    }
  }
}
