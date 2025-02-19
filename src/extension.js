const vscode = require('vscode');
const { exec } = require('child_process');

/**
 * Registers the "mash.runFile" command which runs a file with the .msh extension
 * using the "mash" command.
 *
 * The command is only enabled if a file is open in the editor. If no file is open,
 * the user is shown an error message.
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

        const command = `mash "${filePath}"`;

        const terminal = vscode.window.createTerminal("Mash Terminal");
        terminal.sendText(command);
        terminal.show();
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = { activate, deactivate };
