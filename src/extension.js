const vscode = require('vscode');
const path = require('path');
const os = require('os');

/**
 * Registers the "mash.runFile" command which runs a file with the .msh extension
 * using the appropriate "mash" executable based on the operating system.
 *
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('mash.runFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const filePath = document.uri.fsPath;

        if (document.isUntitled) {
            vscode.window.showErrorMessage('Save the file before running.');
            return;
        }

        const isWindows = os.platform() === 'win32';
        const mashExecutable = isWindows
            ? path.join(context.extensionPath, 'bin', 'windows', 'mash.exe')
            : path.join(context.extensionPath, 'bin', 'linux', 'mash');

        const command = `"${mashExecutable}" "${filePath}"`;

        const terminal = vscode.window.createTerminal("Mash Terminal");
        terminal.sendText(command);
        terminal.show();
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = { activate, deactivate };
