import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const apiToken = process.env.GITHUB_API_TOKEN;

export async function fetchGitHubIssues(pkg) {
    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${pkg}`, {
            headers: {
                Authorization: `token ${apiToken}`,
            },
        });
        if (response.data.items && response.data.items.length > 0) {
            const repo = response.data.items[0];
            const issuesResponse = await axios.get(`https://api.github.com/search/issues?q=repo:${repo.owner.login}/${repo.name}`, {
                headers: {
                    Authorization: `token ${apiToken}`,
                },
            });

            if (issuesResponse.data.items) {
                return issuesResponse.data.items;
            } else {
                throw new Error('No issues found or GitHub API error');
            }
        } else {
            throw new Error(`No repository found for ${pkg}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`Error fetching issues for ${pkg}: ${error.response ? error.response.data.message : error.message}`);
    }
}

export async function checkRateLimit() {
    try {
        const response = await axios.get('https://api.github.com/rate_limit', {
            headers: {
                Authorization: `token ${apiToken}`,
            },
        });

        const rateLimit = response.data.resources.core;
        console.log(`Rate limit: ${rateLimit.remaining} remaining out of ${rateLimit.limit}`);
        return rateLimit.remaining;
    } catch (error) {
        console.error('Error checking rate limit:', error.message);
    }
}