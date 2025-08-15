document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const inputText = document.getElementById('inputText');

    const wordsList = document.getElementById('wordsList');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const longestWord = document.getElementById('longestWord');
    const shortestWord = document.getElementById('shortestWord');
    const palindromeResult = document.getElementById('palindromeResult');
    const highlightedText = document.getElementById('highlightedText');

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function analyze(text) {
        const words = text.split(/\s+/)
            .filter(word => word.length > 0)
            .map(word => word.replace(/[^a-zA-Z0-9']/g, ''));

        const chars = words.join('').length;
        let longest = '';
        let shortest = words[0] || '';

        words.forEach(word => {
            if (word.length > longest.length) longest = word;
            if (word.length < shortest.length) shortest = word;
        });

        const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isPalindrome = cleanText === cleanText.split('').reverse().join('');
        return { words, counts: { words: words.length, chars }, longest, shortest, isPalindrome };
    }

    function displayResults(analysis, originalText) {
        wordsList.textContent = `[${analysis.words.map(w => `"${w}"`).join(', ')}]`;
        wordCount.textContent = analysis.counts.words;
        charCount.textContent = analysis.counts.chars;
        longestWord.textContent = analysis.longest;
        shortestWord.textContent = analysis.shortest;
        palindromeResult.textContent = analysis.isPalindrome ? 'Yes' : 'No';
    }

    analyzeBtn.addEventListener('click', () => {
        const text = inputText.value;
        const analysis = analyze(text);
        displayResults(analysis, text);
    });

    // page load e run kora
    const initialAnalysis = analyze(inputText.value);
    displayResults(initialAnalysis, inputText.value);
});