import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRODUCT } from '../common/models/models';
import { IProduct } from './interfaces/product.interface';
import { ProductDTO } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT.name) private readonly model: Model<IProduct>,
  ) {}

  /**
   * Create Product
   * @param productDTO
   */
  async store(productDTO: ProductDTO): Promise<IProduct> {
    const newProduct = new this.model({ ...productDTO });
    return await newProduct.save();
  }

  /**
   * Get All Products
   */
  async getAll(id: string) {
    return this.model.find({ owner: id }).exec();
  }

  /**
   * Get Product
   */
  async getOne(id: string) {
    return this.model.findOne({ id: id }).exec();
  }

  /**
   * Update Product
   * @param id
   * @param productDTO
   */
  async updateProduct(id: string, productDTO: ProductDTO) {
    const product = { ...productDTO };
    return this.model.findByIdAndUpdate(id, product, { new: true });
  }

  /**
   * Delete Product
   */
  async deleteProduct(productId: string) {
    await this.model.findByIdAndDelete(productId);
    return {
      status: HttpStatus.OK,
      message: 'Deleted',
    };
  }
}
