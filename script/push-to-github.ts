// GitHub Integration Script - Uses Replit's GitHub connector
import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

// Files and directories to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.replit',
  'replit.nix',
  '.config',
  '.upm',
  '.cache',
  'dist',
  '.env',
  '.env.local',
  'package-lock.json',
  '.breakpoints',
  'generated-icon.png'
];

function shouldIgnore(filePath: string): boolean {
  const parts = filePath.split(path.sep);
  return parts.some(part => IGNORE_PATTERNS.includes(part));
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (shouldIgnore(fullPath)) return;
    
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function uploadFile(octokit: Octokit, owner: string, repo: string, filePath: string, existingSha?: string) {
  const content = fs.readFileSync(filePath);
  const base64Content = content.toString('base64');
  
  const params: any = {
    owner,
    repo,
    path: filePath,
    message: existingSha ? `Update ${filePath}` : `Add ${filePath}`,
    content: base64Content,
    branch: 'main'
  };
  
  if (existingSha) {
    params.sha = existingSha;
  }
  
  await octokit.repos.createOrUpdateFileContents(params);
}

async function main() {
  const oldRepoName = 'rest-express';
  const newRepoName = 'Shoppermo-Website';
  
  console.log('Connecting to GitHub...');
  const octokit = await getUncachableGitHubClient();
  
  // Get authenticated user
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
  
  // Check if new repo exists, or rename old repo, or create new
  let repo;
  let repoName = newRepoName;
  
  try {
    // First check if the new repo name already exists
    const { data } = await octokit.repos.get({
      owner: user.login,
      repo: newRepoName
    });
    repo = data;
    console.log(`Repository ${newRepoName} already exists`);
  } catch (error: any) {
    if (error.status === 404) {
      // New repo doesn't exist, check if old repo exists to rename
      try {
        await octokit.repos.get({
          owner: user.login,
          repo: oldRepoName
        });
        console.log(`Found existing repository ${oldRepoName}, renaming to ${newRepoName}...`);
        const { data: renamedRepo } = await octokit.repos.update({
          owner: user.login,
          repo: oldRepoName,
          name: newRepoName
        });
        repo = renamedRepo;
        console.log(`Repository renamed to: ${repo.html_url}`);
      } catch (renameError: any) {
        if (renameError.status === 404) {
          // Neither old nor new repo exists, create new one
          console.log(`Creating repository ${newRepoName}...`);
          const { data } = await octokit.repos.createForAuthenticatedUser({
            name: newRepoName,
            private: false,
            auto_init: true
          });
          repo = data;
          console.log(`Repository created: ${repo.html_url}`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw renameError;
        }
      }
    } else {
      throw error;
    }
  }

  // Get all files
  console.log('Gathering files...');
  const files = getAllFiles('.');
  console.log(`Found ${files.length} files to push`);

  // Get existing files in repo to check for updates
  let existingFiles: Map<string, string> = new Map();
  try {
    const { data: tree } = await octokit.git.getTree({
      owner: user.login,
      repo: repoName,
      tree_sha: 'main',
      recursive: 'true'
    });
    tree.tree.forEach((item: any) => {
      if (item.type === 'blob') {
        existingFiles.set(item.path, item.sha);
      }
    });
  } catch (error: any) {
    console.log('No existing files in repo');
  }

  // Upload files one by one using the contents API
  console.log('Uploading files...');
  let uploadedCount = 0;
  
  for (const file of files) {
    try {
      const existingSha = existingFiles.get(file);
      await uploadFile(octokit, user.login, repoName, file, existingSha);
      uploadedCount++;
      process.stdout.write(`\rUploaded ${uploadedCount}/${files.length} files`);
    } catch (error: any) {
      console.error(`\nError uploading ${file}: ${error.message}`);
    }
  }

  console.log('\n\n✅ Successfully pushed to GitHub!');
  console.log(`Repository URL: ${repo.html_url}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
