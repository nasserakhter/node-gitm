import assert from 'assert';
import type GitInterface from '.';
import { EOL } from 'os';

export default async function getCurrentBranch(ctx: GitInterface) {
  /* Sample output:
    * DEV-hotfix
    development
    main
  */
  const result = await ctx.runCommand('branch');
  const currentBranch = result
    .split(EOL)
    .find((x) => x.startsWith('*'))
    ?.slice(1)
    .trim();

  assert(currentBranch, 'Could not find current branch');
  return currentBranch;
}
