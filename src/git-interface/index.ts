import which from 'which';
import { execFile } from 'child_process';
import getCurrentBranch from './current-branch';

export default class GitInterface {
  binPath: string;
  getCurrentBranch = getCurrentBranch;

  constructor(binPath?: string) {
    this.binPath = binPath ?? which.sync('git');
  }

  async runCommand(...args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      execFile(this.binPath, args, (err, stdout, _) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
