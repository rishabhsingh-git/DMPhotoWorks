import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import * as fetch from 'isomorphic-fetch';

@Injectable()
export class DropboxService {
  private dbx: Dropbox;

  constructor() {
    this.dbx = new Dropbox({
      accessToken: process.env.accessToken,
      fetch: fetch,
    });
  }

  async dropBoxService(buffer: Buffer, originalname: string): Promise<string> {
    try {
      const uploadResponse = await this.dbx.filesUpload({
        path: `/${originalname}`,
        contents: buffer,
      });

      const sharedLinkResponse =
        await this.dbx.sharingCreateSharedLinkWithSettings({
          path: uploadResponse.result.path_lower,
        });

      console.log(
        `======================================> in the shared `,
        sharedLinkResponse,
      );

      return sharedLinkResponse.result.url
        .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '');
    } catch (error) {
      throw new Error(`Failed to upload file to Dropbox: ${error.message}`);
    }
  }
}
