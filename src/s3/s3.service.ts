import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
    private readonly s3: AWS.S3;
    private readonly bucketName: string;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: 'AKIAWPGQVZY5HDCIERKC',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        this.bucketName = 'resource-builder';
    }
    async uploadFile(file: Express.Multer.File): Promise<any> {
        const uploadResult = await this.s3
            .upload(
                {
                    Bucket: this.bucketName,
                    Body: file.buffer,
                    Key: `${uuidv4()}-${file.originalname}`,
                    ContentType: file.mimetype
                    // ACL: 'public-read'
                },
                (err, data) => {
                    if (err) {
                        console.error('Error uploading to S3:', err);
                    } else {
                        console.log('Upload successful:', data.Location);
                    }
                }
            )
            .promise();

        return uploadResult;
    }

    async getPresignedUrl(key: string): Promise<string> {
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Expires: 60 // URL expiration time in seconds
        };

        try {
            const url = await this.s3.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            throw new Error('Error generating presigned URL');
        }
    }
}
