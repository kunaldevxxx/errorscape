import fs from 'fs';
import { logWarning, logSuccess } from './utils/logger.js';
import { fetchGitHubIssues, checkRateLimit } from './utils/apiHelper.js';
import dotenv from 'dotenv';
dotenv.config();
const apiToken = process.env.GITHUB_API_TOKEN;
export async function checkDependencies() {
    const packageJson = JSON.parse(await fs.promises.readFile('./package.json', 'utf-8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const remainingRequests = await checkRateLimit();
    if (remainingRequests <= 0) {
        console.log('GitHub API rate limit exceeded. Please try again later.');
        return;
    }

    for (const [pkg, version] of Object.entries(dependencies)) {
        console.log(`Checking ${pkg}...`);
        try {
            const issues = await fetchGitHubIssues(pkg, apiToken);

            if (issues.length > 0) {
                logWarning(`⚠️ Issues found for ${pkg}:`);
                issues.forEach(issue => logWarning(`- ${issue.title} (${issue.url})`));
            } else {
                logSuccess(`✅ No known issues for ${pkg}`);
            }
        } catch (error) {
            console.error(`Error checking ${pkg}:`, error.message);
        }
    }
}
