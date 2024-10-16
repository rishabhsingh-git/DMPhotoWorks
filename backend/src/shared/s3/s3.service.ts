import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {

    private s3: S3Client;
    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_BUCKET_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
    }

    async uploadFile(buffer: Buffer, fileName: string): Promise<string> {
        try {

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `DMPhotoworksImages/${fileName}`,
                Body: buffer,
                ContentType: 'image/jpeg',
            });
            const response = await this.s3.send(command);

            if (response.$metadata.httpStatusCode === 200) {
                return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/DMPhotoworksImages/${fileName}`;
            }
        } catch (error) {
            Logger.error('Error occurred while uploading assset to s3 bucket:', error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: error,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );

        }
    }


}
