// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { diskStorage } from 'multer';
// import { extname, join } from 'path';
// import { unlink, access } from 'fs/promises';
// import { ProductImageEntity } from 'apps/libs/entities/images/product-image.entity';
// import { UploadProductImageDto } from 'apps/libs/dto/images/upload-product-image.dto';
// import { SetPrincipalProductImageDto } from 'apps/libs/dto/images/set-principal-product-image.dto';
// import { envs } from 'apps/libs/config/envs';

// const ImagesDir = join(__dirname, '../../../../storageMiParral/images/products');

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectRepository(ProductImageEntity)
//     private readonly productImageRepository: Repository<ProductImageEntity>,
//   ) {}




//   // Configuración de Multer para manejar la subida de archivos
//   public static storage = diskStorage({
//     destination: ImagesDir,
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const filename = `${uniqueSuffix}${extname(file.originalname)}`;
//       cb(null, filename);
//     },
//   });

//   async upload(dto: UploadProductImageDto): Promise<ProductImageEntity> {
//     const { productId, file } = dto;
//     const newImage = this.productImageRepository.create({
//       productId,
//       image: file.filename,
//     });

//     return await this.productImageRepository.save(newImage);
//   }

//   async findAllByProductId(productId: string): Promise<ProductImageEntity[]> {
//     return this.productImageRepository.find({ where: { productId } });
//   }

//   async setPrincipalProductImage(dto: SetPrincipalProductImageDto): Promise<ProductImageEntity> {
//     const { productId, imageId } = dto;
//     const images = await this.findAllByProductId(productId);
//     const image = images.find((img) => img.id === imageId);

//     if (!image) {
//       throw new NotFoundException('Image not found');
//     }

//     await Promise.all(
//       images.map(async (img) => {
//         if (img.principal) {
//           img.principal = false;
//           await this.productImageRepository.save(img);
//         }
//       })
//     );

//     image.principal = true;
//     return await this.productImageRepository.save(image);
//   }

//   async findPrincipalImage(productId: string): Promise<ProductImageEntity> {
//     const image = await this.productImageRepository.findOne({
//       where: { productId, principal: true },
//     });

//     if (!image) {
//         return {
//           id: null,
//           productId,
//           image: envs.images.defaultImageUrl,
//           principal: true,
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         };
//       }
//       return image;
//   }

//   async deleteImage(imageId: string): Promise<void> {
//     const image = await this.productImageRepository.findOne({ where: { id: imageId } });
//     if (!image) {
//       throw new NotFoundException('Image not found');
//     }

//     const imagePath = join(ImagesDir, image.image);

//     try {
//       await access(imagePath);
//       await unlink(imagePath);
//     } catch (error) {
//       console.error('Error deleting file:', error);
//     }

//     await this.productImageRepository.remove(image);
//   }
// }
