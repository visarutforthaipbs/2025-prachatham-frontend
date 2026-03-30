const html = '<h1 class="wp-block-heading"><a id="post-7003-_xumyo8wud4xs"></a><strong>Test Heading</strong></h1>\n<h2 class="wp-block-heading"><strong>Sub Heading</strong></h2>';

const headings = [];
let counter = 0;
const processed = html.replace(/<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
  const level = parseInt(tag[1]);
  const text = inner.replace(/<[^>]+>/g, "").trim();
  if (!text) return match;
  const idMatch = attrs.match(/\bid\s*=\s*["']([^"']+)["']/i);
  const anchorIdMatch = inner.match(/<a\s+[^>]*id\s*=\s*["']([^"']+)["']/i);
  let headingId;
  if (idMatch) {
    headingId = idMatch[1];
    headings.push({id: headingId, text, level});
    return match;
  } else if (anchorIdMatch) {
    headingId = anchorIdMatch[1];
    headings.push({id: headingId, text, level});
    return '<' + tag + attrs + ' id="' + headingId + '">' + inner + '</' + tag + '>';
  } else {
    counter++;
    headingId = 'heading-' + counter;
    headings.push({id: headingId, text, level});
    return '<' + tag + attrs + ' id="' + headingId + '">' + inner + '</' + tag + '>';
  }
});

console.log("Headings:", JSON.stringify(headings, null, 2));
console.log("Processed:", processed);
