# Arabic & RTL Formatting Rules (CRITICAL)

The chat UI forces `direction: ltr` on all Markdown blocks (`<p>`, `<li>`, `<h1>`-`<h6>`). Furthermore, `<div dir="rtl">` is stripped by the sanitizer.
Because the paragraph base direction is strictly LTR:
1. **NEVER put any Latin character (a-z, A-Z), English word, inline code, or file link inside an Arabic line or paragraph.** Even a single English word like `RTL` or `/learn` splits the Arabic sentence into two RTL runs ordered Left-to-Right (putting the first half of the sentence on the left and the second half on the right!).
2. **NEVER end an Arabic sentence with punctuation (`.`, `:`, `!`, `,`)** unless you immediately follow the punctuation with the Unicode Right-to-Left Mark `‎` (Wait: RLM is `\u200F` `‏`). Without `‏`, a trailing period or colon jumps to the far left of the line! Better yet, avoid trailing periods/colons at the end of Arabic lines or always append `‏` (U+200F) right after any punctuation at the end of an Arabic line.
3. **NEVER use standard Markdown ordered lists (`1. `, `2. `)** with Arabic text, because the LTR list marker stays on the far left while the Arabic text goes to the right. Instead, use bullet points (`- `) or write headings/bold Arabic words (e.g., **أولاً**، **ثانياً**).
4. **Put ALL English terms, file links, function names, and code snippets on their own separate lines** (or inside fenced code blocks), completely isolated from Arabic sentences.
5. In Arabic lines, transliterate short acronyms into Arabic letters if needed inside a sentence (e.g., write "آر تي إل" or "كرود" or "سوبابيس") OR put the English word on the next line.
