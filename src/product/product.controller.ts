import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put,
  UseGuards
} from "@nestjs/common";
import { ProductService } from './product.service';
import { ProductDTO } from './dtos/product.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Product')
@Controller('api/v1/product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOkResponse({
    description: 'Product Created.',
    type: ProductDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiOperation({
    summary: 'Product Created.',
    description: 'Product Created.',
  })
  store(@Body() productDTO: ProductDTO) {
    return this.productService.store(productDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({
    description: 'Get Products.',
    type: ProductDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiOperation({
    summary: 'Get Products.',
    description: 'Get Products.',
  })
  getAll(@Param('id') id: string) {
    return this.productService.getAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({
    description: 'Update Product.',
    type: ProductDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiOperation({
    summary: 'Update Product.',
    description: 'Update Product.',
  })
  update(@Param('id') id: string, @Body() productDTO: ProductDTO) {
    return this.productService.updateProduct(id, productDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete Product.',
    type: ProductDTO,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiOperation({
    summary: 'Delete Product.',
    description: 'Delete Product.',
  })
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
