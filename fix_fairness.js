const fs = require('fs');

let html = fs.readFileSync('C:\\sY26\\client\\fairness.html', 'utf8');

// Replace the first block with the user's provided code
const firstBlockRegex = /<div class="Fairness_article-code_nsZ8b Fairness_active_lUOUe"><pre class="language-javascript" tabindex="0"><code class="language-javascript">[\s\S]*?<\/code><\/pre><\/div>/;

const userCode = `<div class="Fairness_article-code_nsZ8b Fairness_active_lUOUe"><pre class="language-javascript" tabindex="0"><code class="language-javascript">
const crypto = require('crypto');
const gameId = '1777809248646';
const serverSeed = '3555618497292';
const publicSeed = '5333427745938';
const roundCount = 2;
const playerCount = 2;

const fairGetBattlesOutcome = () => {
    for(round = 0; round < roundCount; round++) {
        for(player = 0; player < playerCount; player++) {
            const combined = \`\${gameId}-\${serverSeed}-\${publicSeed}-\${round}-\${player}\`;
            const hash = crypto.createHash('sha256').update(combined).digest('hex');
            const outcome = parseInt(hash.substr(0, 8), 16) % 10000;

            console.log(\`Round: \${round + 1} - Player: \${player + 1} - Outcome: \${outcome}\`);
        }
    }
}

fairGetBattlesOutcome();
</code></pre></div>`;

html = html.replace(firstBlockRegex, userCode);

// Untokenize the rest of the blocks
const blockRegex = /<div class="Fairness_article-code_nsZ8b"><pre class="language-javascript" tabindex="0"><code class="language-javascript">([\s\S]*?)<\/code><\/pre><\/div>/g;

html = html.replace(blockRegex, (match, p1) => {
    let untokenized = p1.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
    untokenized = untokenized.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return `<div class="Fairness_article-code_nsZ8b"><pre class="language-javascript" tabindex="0"><code class="language-javascript">${untokenized}</code></pre></div>`;
});

fs.writeFileSync('C:\\sY26\\client\\fairness.html', html, 'utf8');
console.log('Done');
