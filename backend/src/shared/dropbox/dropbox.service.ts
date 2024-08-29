import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';
import * as fetch from 'isomorphic-fetch';

@Injectable()
export class DropboxService {
  private dbx: Dropbox;

  constructor() {
    this.dbx = new Dropbox({
      accessToken:
        'sl.B76bG_O3HZPV7T3Kt0xGJXBbyMiVQQX8MP6_HIeIr9VG0n6uE6O1NY9g3lwhX7KerRqv92K35ciOrWtgpYcADQnLkJYhvtpQ-JKRVba5zHyjMvqSMPWc9NcRjDX68_ukcxRDwPn0qJvkLwQqridi',
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
