
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sql from 'mssql/msnodesqlv8';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: sql.ConnectionPool;

  async onModuleInit() {
    try {
      this.pool = await sql.connect({
        server: 'localhost',
        database: 'vare',
        driver: 'msnodesqlv8',
        options: {
          trustedConnection: true
        },
      });

      console.log(' Connected to SQL Server via Windows Auth');
    } catch (error) {
      console.error(' Database connection failed:', error);
    }
  }

  getPool(): sql.ConnectionPool {
    return this.pool;
  }

  sanitizeLoginInput(input: string): string {
    return input.replace(/[-'";]/g, '');
  }
  sanitizeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
}
