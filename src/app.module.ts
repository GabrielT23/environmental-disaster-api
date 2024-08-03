import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/user.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { OccurencesModule } from '@modules/occurences/occurences.module';
import { CoreModule } from '@core/core.module';

@Module({
  imports: [CoreModule, UsersModule, CategoriesModule, OccurencesModule],
})
export class AppModule {}
