import chalk from 'chalk'; 

export function logSuccess(message) {
    console.log(chalk.green(message));
}

export function logWarning(message) {
    console.log(chalk.yellow(message));
}

export function logError(message) {
    console.log(chalk.red(message));
}
