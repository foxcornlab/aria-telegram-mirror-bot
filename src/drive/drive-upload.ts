import driveAuth = require('./drive-auth');
import driveFile = require('./upload-file');
import utils = require('./drive-utils');
import { google, drive_v3 } from 'googleapis';
import constants = require('../.constants.js');
import { AxiosResponse } from 'axios';


export function uploadFileOrFolder(filePath: string, mime: string, parent: string, size:number, callback: (err: string, id: string) => void): void {
  driveAuth.call((err, auth) => {
    if (err) {
      callback(err, null);
      return;
    }
    const drive = google.drive({ version: 'v3', auth });

    if (mime === 'application/vnd.google-apps.folder' || size === 0) {
      createFolderOrEmpty(drive, filePath, parent, mime,callback);
    } else {
      driveFile.uploadGoogleDriveFile(parent, {
        filePath: filePath,
        mimeType: mime
      })
        .then(id => callback(null, id))
        .catch(err => callback(err.message, null));
    }
  });
}

function createFolderOrEmpty(drive: drive_v3.Drive, filePath: string, parent: string, mime:string, callback: (err: string, id: string) => void): void {
  drive.files.create({
    // @ts-ignore Unknown property error
    fields: 'id',
    resource: { 
      mimeType: mime,
      name: filePath.substring(filePath.lastIndexOf('/') + 1),
      parents: [parent]
    }
  },
    (err:Error, res:any) => {
      if (err) {
        callback(err.message, null);
      } else {
        callback(null, res.data.id);
      }
    });
}

export function getSharableLink(fileId:string, isFolder:boolean, callback: (err: string, url: string) => void): void {
  driveAuth.call((err, auth) => {
    if (err) {
      callback(err, null);
      return;
    }
    const drive = google.drive({ version: 'v3', auth });
    createPermissions(drive, fileId)
      .then(() => {
        callback(null, utils.getFileLink(fileId, isFolder));
      })
      .catch(err => {
        callback(err.message, null);
      });
  });
}

async function createPermissions(drive: drive_v3.Drive, fileId: string): Promise<any> {
  if (constants.DRIVE_FILE_PRIVATE && constants.DRIVE_FILE_PRIVATE.ENABLED) {
    var req: AxiosResponse<drive_v3.Schema$Permission>[] = [];

    for (var email of constants.DRIVE_FILE_PRIVATE.EMAILS) {
      var perm = await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'user',
          emailAddress: email
        }
      });
      req.push(perm);
    }
    return Promise.all(req);
  } else {
    return drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });
  }
}
