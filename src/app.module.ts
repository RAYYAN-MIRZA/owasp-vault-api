import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { UsersController } from './my-controllers/user/user.controller';
import { UnsecureController } from './my-controllers/unsecure/unsecure.controller';
import { SecureController } from './my-controllers/secure/secure.controller';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1433,
    //   database: 'vare',
    //   synchronize: true,
    //   // username:'AzureAD\\RayyanMirza',
    //   // No username or password needed for Windows Auth
    //   extra: {
    //     options: {
    //       trustedConnection: true,           // ✅ Use Windows Auth
    //       encrypt: true,
    //       trustServerCertificate: true,
    //     },
    //   },
    // }),    
  ],
  controllers: [AppController,UsersController,UnsecureController,SecureController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
