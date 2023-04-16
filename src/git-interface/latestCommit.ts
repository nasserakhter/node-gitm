import type GitInterface from '.';

type NativeGitCommit = {
  commit: string;
  abbreviated_commit: string;
  tree: string;
  abbreviated_tree: string;
  parent: string;
  abbreviated_parent: string;
  refs: string;
  encoding: string;
  subject: string;
  sanitized_subject_line: string;
  body: string;
  commit_notes: string;
  verification_flag: string;
  signer: string;
  signer_key: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  commiter: {
    name: string;
    email: string;
    date: string;
  };
};

type GitCommit = {
  commitHash: string;
  commitHashShort: string;
  treeHash: string;
  treeHashShort: string;
  parentHash: string;
  parentHashShort: string;
  localRef: string; // I.e HEAD
  localBranch: string; // I.e. main
  remoteBranch?: string | undefined; // I.e. origin/main
  encoding: string;
  subject: string;
  sanitizedSubjectLine: string;
  body: string;
  commitNotes: string;
  verificationFlag: string;
  signer: string;
  signerKey: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  commiter: {
    name: string;
    email: string;
    date: string;
  };
};

export default async function getLatestCommit(ctx: GitInterface) {
  const prettyFormat =
    '{%n  "commit": "%H",%n  "abbreviated_commit": "%h",%n  "tree": "%T",%n  "abbreviated_tree": "%t",%n  "parent": "%P",%n  "abbreviated_parent": "%p",%n  "refs": "%D",%n  "encoding": "%e",%n  "subject": "%s",%n  "sanitized_subject_line": "%f",%n  "body": "%b",%n  "commit_notes": "%N",%n  "verification_flag": "%G?",%n  "signer": "%GS",%n  "signer_key": "%GK",%n  "author": {%n    "name": "%aN",%n    "email": "%aE",%n    "date": "%aD"%n  },%n  "commiter": {%n    "name": "%cN",%n    "email": "%cE",%n    "date": "%cD"%n  }%n}';
  const result = await ctx.runCommand(
    'log',
    '-n',
    '1',
    '--pretty=format:' + prettyFormat,
  );
  console.log(result);
  const nativeCommit = JSON.parse(result) as NativeGitCommit;
  const commit: GitCommit = {
    commitHash: nativeCommit.commit,
    commitHashShort: nativeCommit.abbreviated_commit,
    treeHash: nativeCommit.tree,
    treeHashShort: nativeCommit.abbreviated_tree,
    parentHash: nativeCommit.parent,
    parentHashShort: nativeCommit.abbreviated_parent,
    localRef: nativeCommit.refs.split('->')[0]?.trim() ?? 'HEAD',
    localBranch: nativeCommit.refs.split('->')[1]?.trim() ?? 'master',
    remoteBranch: nativeCommit.refs.split(',')[2]?.trim(),
    encoding: nativeCommit.encoding,
    subject: nativeCommit.subject,
    sanitizedSubjectLine: nativeCommit.sanitized_subject_line,
    body: nativeCommit.body,
    commitNotes: nativeCommit.commit_notes,
    verificationFlag: nativeCommit.verification_flag,
    signer: nativeCommit.signer,
    signerKey: nativeCommit.signer_key,
    author: nativeCommit.author,
    commiter: nativeCommit.commiter,
  };
  return commit;
}
