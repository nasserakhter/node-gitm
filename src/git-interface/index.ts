import which from 'which';
import { execFile } from 'child_process';
import getCurrentBranch from './currentBranch';
import getLatestCommit from './latestCommit';

export default class GitInterface {
  binPath: string;
  getCurrentBranch: () => Promise<GitBranch>;

  constructor(binPath?: string) {
    this.binPath = binPath ?? which.sync('git');
    this.getCurrentBranch = async () => getCurrentBranch(this);
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

  branch(name: string) {
    return new GitBranch(name, this);
  }
}

class GitBranch {
  ctx;
  name;
  getLatestCommit;

  constructor(name: string, ctx: GitInterface) {
    this.name = name;
    this.ctx = ctx;
    this.getLatestCommit = async () => getLatestCommit(ctx);
  }
}
