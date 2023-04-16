import GitInterface from './git-interface';

async function main() {
  const git = new GitInterface();
  const branch = await git.getCurrentBranch();
  console.dir(branch);
  console.dir(await branch.getLatestCommit());
  console.log('hello world');
}

void main();
