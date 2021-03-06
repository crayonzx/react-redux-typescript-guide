"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const CWD_PATH = `${__dirname}/`;
const TOP_LEVEL_PATH = CWD_PATH + '../../';
const DOCS_PATH = TOP_LEVEL_PATH + 'docs/markdown/';
const inputFiles = [
    DOCS_PATH + '_intro.md',
    DOCS_PATH + '_toc.md',
    DOCS_PATH + '0_setup.md',
    DOCS_PATH + '1_react.md',
    DOCS_PATH + '2_redux.md',
    DOCS_PATH + '3_tools.md',
    DOCS_PATH + '4_recipes.md',
    DOCS_PATH + '5_faq.md',
    DOCS_PATH + '6_end.md',
    DOCS_PATH + '7_links.md',
];
const outputFile = TOP_LEVEL_PATH + 'README.md';
const result = inputFiles
    .map(filePath => fs.readFileSync(filePath, 'utf8'))
    .map(includeExamples)
    .map(includeUsages)
    .join('\n---\n\n');
fs.writeFileSync(outputFile, result, 'utf8');
function includeExamples(text) {
    const INCLUDE_PATTERN = /::example='(.+?)'::/g;
    return text.replace(INCLUDE_PATTERN, getReplacerWithWrapper(withCodeWrapper));
}
function includeUsages(text) {
    const INCLUDE_PATTERN = /::usage='(.+?)'::/g;
    return text.replace(INCLUDE_PATTERN, getReplacerWithWrapper(withDetailsWrapper));
}
function getReplacerWithWrapper(wrapper) {
    return (match, filePath) => {
        console.log(CWD_PATH + filePath);
        const buffer = fs.readFileSync(CWD_PATH + filePath, 'utf8');
        return wrapper(buffer);
    };
}
function withCodeWrapper(text) {
    return `
${'```tsx'}
${text}
${'```'}
  `.trim();
}
function withDetailsWrapper(text) {
    return `
<details><summary>show usage</summary><p>

${'```tsx'}
${text}
${'```'}
</p></details>
  `.trim();
}
//# sourceMappingURL=generate-readme.js.map