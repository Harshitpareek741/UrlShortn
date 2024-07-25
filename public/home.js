// script.js

document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const textarea = document.getElementById('readonly-textarea');

    copyButton.addEventListener('click', () => {
        textarea.select();
        document.execCommand('copy');
        alert('Text copied to clipboard!');
    });
});
