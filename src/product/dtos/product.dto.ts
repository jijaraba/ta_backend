import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IProduct } from '../interfaces/product.interface';

export class ProductDTO implements IProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  owner: string;
}
