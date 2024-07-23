const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const content_path = 'src/content'

// 读取数据文件
const repos = JSON.parse(fs.readFileSync('members.json', 'utf-8'));

// 遍历每个仓库
repos.forEach(repo => {
  const repoUrl = repo.repo;
  const localDir = path.join(__dirname, '../' + content_path, repo.name);

  try {
    if (fs.existsSync(localDir)) {
      // 如果目录存在，则更新仓库
      console.log(`Updating repository in ${repo.name}`);
      execSync('git pull', { cwd: localDir, stdio: 'inherit' });
    } else {
      // 如果目录不存在，则克隆仓库
      console.log(`Cloning repository ${repoUrl} into ${repo.name}`);
      execSync(`git clone ${repoUrl} ${localDir}`, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error(`Failed to process repository ${repoUrl}:`, error);
  }
});
