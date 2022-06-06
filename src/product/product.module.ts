import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT } from '../common/models/models';
import { ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeatureAsync([
      {
        name: PRODUCT.name,
        useFactory: () => {
          return ProductSchema;
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
