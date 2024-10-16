import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import BackblazeB2 from 'backblaze-b2';


@Injectable()
export class BackblazeService {
    private readonly b2: any

    constructor() {
        this.b2 = new BackblazeB2({
            applicationKeyId: process.env.B2_BUCKET_KEY_ID,
            applicationKey: process.env.B2_APPLICATION_ID
        });
    }


    async uploadFile(buffer: Buffer, fileName: string): Promise<any> {
        try {


            await this.b2.authorize();
            const bucketId = process.env.B2_BUCKET_ID;
            const bucketName = process.env.B2_BUCKET_NAME
            const uploadUrlResponse = await this.b2.getUploadUrl({ bucketId });
            const uploadUrl = uploadUrlResponse.data.uploadUrl;
            const uploadAuthToken = uploadUrlResponse.data.authorizationToken;


            await this.b2.uploadFile({
                uploadUrl,
                uploadAuthToken,
                fileName,
                data: buffer,
            });

            const signedUrlResponse = await this.b2.getDownloadAuthorization(
                {
                    bucketId,
                    fileNamePrefix: fileName,
                    uploadAuthToken,
                    validDurationInSeconds: 604800,
                });

            const signedUrl = `https://f005.backblazeb2.com/file/${bucketName}/${fileName}?Authorization=${signedUrlResponse?.data?.authorizationToken}`;

            if (signedUrlResponse?.data?.authorizationToken) {
                return { status: 200, url: signedUrl }
            }
        } catch (error) {
            Logger.error('Error occurred while uploading assset to b2 cloud:', error);
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
