#!/usr/bin/env node

import inquirer from 'inquirer';  
import ora from 'ora';  
import { parseStackTrace } from './stackTraceParser.js';  
import { checkDependencies } from './dependencyChecker.js';

async function main() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'Analyze an Error Stack Trace',
                'Check Dependencies for Issues',
                'Exit',
            ],
        },
    ]);

    switch (choice) {
        case 'Analyze an Error Stack Trace':
            const { stack } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'stack',
                    message: 'Paste the stack trace:',
                },
            ]);
            const parsedStack = parseStackTrace({ stack });
            console.log(parsedStack);
            break;

        case 'Check Dependencies for Issues':
            const spinner = ora('Checking dependencies...').start();
            await checkDependencies();
            spinner.stop();
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
}

main();
