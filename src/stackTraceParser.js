import { logError } from './utils/logger.js';

export function parseStackTrace(error) {
    if (!error || !error.stack) {
        logError('No stack trace provided.');
        return [];
    }

    try {
        const stackRegex = /at\s(.*)\s\((.*?):(\d+):(\d+)\)/;
        const stackLines = error.stack.split('\n');
        const parsedStack = stackLines.map(line => {
            const match = stackRegex.exec(line);
            if (match) {
                return {
                    methodName: match[1] || 'unknown',
                    file: match[2] || 'unknown',
                    lineNumber: parseInt(match[3], 10) || 0,
                    column: parseInt(match[4], 10) || 0
                };
            } else {
                return {
                    methodName: 'unknown',
                    file: 'unknown',
                    lineNumber: 0,
                    column: 0
                };
            }
        }).filter(entry => entry.methodName !== 'unknown'); 

        if (parsedStack.length === 0) {
            logError('No valid stack trace entries found.');
        }

        return parsedStack;

    } catch (e) {
        logError('Failed to parse stack trace');
        return [{ 
            file: 'unknown', 
            lineNumber: 0, 
            column: 0, 
            methodName: 'unknown' 
        }];
    }
}
