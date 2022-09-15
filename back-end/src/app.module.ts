import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './infrastructure/ioc/book.module';
import { MemberModule } from './infrastructure/ioc/member.module';

@Module({
	imports: [
		KnexModule.forRoot({
			config: {
				client: 'pg',
				connection: {
					host: '127.0.0.1',
					port: 5432,
					user: 'postgres',
					password: 'postgres',
					database: 'postgres',
				},
			},
		}),
		MemberModule,
		BookModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
