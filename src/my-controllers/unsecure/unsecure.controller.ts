import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('unsecure')
export class UnsecureController {
constructor(
     @Inject(DatabaseService) private readonly databaseService: DatabaseService,
   ) {}
@Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    const { username, password } = credentials;
    
    // Insecure SQL query: This query is vulnerable to SQL injection
    const query = `SELECT * FROM users WHERE Username = '${username}' AND PasswordHash = '${password}'`;

    try {
      const pool = this.databaseService.getPool();
      const result = await pool.request().query(query);
      
      if (result.recordset.length > 0) {
        return { message: 'Login successful', user: result.recordset[0] };
      } else {
        return { message: 'Invalid credentials' };
      }
    } catch (err) {
      console.error(err);
      return { message: 'Error processing request' };
    }
  }
  @Post('comments')
  async postComment(@Body() body: { text: string }) {
    const text = body.text;
    //const query = `INSERT INTO comments (text, isSanitized) VALUES ('${text}', 0)`;
    const query = `INSERT INTO comments (text, isSanitized) VALUES (@text, 0)`;

    try {
      const pool = this.databaseService.getPool();
      await pool.request()
      .input('text', text)  // Not sanitized, just safely injected
      .query(query);
      return { message: 'Comment posted (insecure)' };
    } catch (err) {
      console.error(err);
      return { message: 'Error posting comment' };
    }
  }

  //Insecure comment fetch (raw rendering)
  @Get('comments')
  async getComments() {
    try {
      const pool = this.databaseService.getPool();
      const result = await pool.request().query(`SELECT * FROM comments WHERE isSanitized = 0`);
      return result.recordset;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

}
