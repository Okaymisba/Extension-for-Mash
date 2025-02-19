const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
    // Register the "Run Mash File" command
    let disposable = vscode.commands.registerCommand('mash.runFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const filePath = document.uri.fsPath;

        // Ensure the file is saved to disk
        if (document.isUntitled) {
            vscode.window.showErrorMessage('Save the file before running.');
            return;
        }

        // Command to execute the Mash script
        const command = `mash "${filePath}"`;

        // Show output in VS Code terminal
        const terminal = vscode.window.createTerminal("Mash Terminal");
        terminal.sendText(command);
        terminal.show();
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = { activate, deactivate };
