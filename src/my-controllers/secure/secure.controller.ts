import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import * as sql from 'mssql/msnodesqlv8';
import { DatabaseService } from 'src/database/database.service';
import { CsrfGuard } from 'src/guards/guard';
@Controller('secure')

export class SecureController {
    constructor(
         @Inject(DatabaseService) private readonly databaseService: DatabaseService,
       ) {}
    @Post('login')
    @UseGuards(CsrfGuard)
    async login(@Body() credentials: { username: string; password: string }) {
    let { username, password } = credentials;

    username = this.databaseService.sanitizeLoginInput(username);
    password = this.databaseService.sanitizeLoginInput(password);
    console.log(username,password);
    const query = `
        SELECT * FROM users WHERE username = @username AND PasswordHash = @password
    `;

    try {
        const pool = this.databaseService.getPool();
        const result = await pool
        .request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query(query);

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
    @UseGuards(CsrfGuard)
    async postComment(@Body() body: { text: string }) {
      let text = body.text;
      const sanitized = this.databaseService.sanitizeHtml(text); // Clean the HTML input
      const query = `INSERT INTO comments (text, isSanitized) VALUES (@text, 1)`;
  
      try {
        const pool = this.databaseService.getPool();
        await pool.request()
          .input('text', sanitized)
          .query(query);
        return { message: 'Comment posted (secure)' };
      } catch (err) {
        console.error(err);
        return { message: 'Error posting comment' };
      }
    }
  
    @Get('comments')
    @UseGuards(CsrfGuard)
    async getComments() {
      try {
        const pool = this.databaseService.getPool();
        const result = await pool.request().query(`SELECT * FROM comments WHERE isSanitized = 1`);
        return result.recordset;
      } catch (err) {
        console.error(err);
        return [];
      }
    }


}


