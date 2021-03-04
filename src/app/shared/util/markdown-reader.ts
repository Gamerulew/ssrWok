
import * as md from 'markdown-it';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mk from '@iktakahiro/markdown-it-katex';
// // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// // @ts-ignore
// import mdInclude from 'markdown-it-include';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdEmoji from 'markdown-it-emoji';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdSub from 'markdown-it-sub';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdSup from 'markdown-it-sup';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdFoot from 'markdown-it-footnote';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdHtml5 from 'markdown-it-html5-embed';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdAttrs from 'markdown-it-attrs';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdtexmath from 'markdown-it-texmath';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdHighlightjs from 'markdown-it-highlightjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdMeta from 'markdown-it-meta';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t = require('markdown-it-multimd-table')
export class MarkdownReader {

  public static read(path: string): string {

    const markdown = md()
      .use(t, {
        multiline: true,
        rowspan: true,
        headerless: false,
      })
      .use(mk)
      // .use(mdInclude)
      .use(mdSub)
      .use(mdMeta)
      .use(mdSup)
      .use(mdFoot)
      .use(mdEmoji)
      .use(mdHighlightjs, {
        inline: true,
        code: true
      })
      .use(mdHtml5, {
        html5embed: {
          useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
          useLinkSyntax: true   // Enables video/audio embed with []() syntax
        }
      })
      .use(mdAttrs, {
        // optional, these are default options
        leftDelimiter: '{',
        rightDelimiter: '}',
        allowedAttributes: []  // empty array = all attributes are allowed
      })
      .use(mdtexmath, {
        engine: require('katex'),
        delimiters: 'dollars',
        katexOptions: {macros: {"\\RR": "\\mathbb{R}"}}
      });

    // var fs = require('fs');
    // var readMe = fs.readFileSync(path, 'utf-8');
    //
    //
    // let markdownItOptions = {
    // 	html: true,
    // 	replaceLink: function (link, env) {
    // 	  // Convert links such as `./blah.md` to `.././blah/`.
    // 	  return link.replace(/^\./, '../.').replace(/.md$/, '/');
    // 	}
    //   };

    return markdown.render(path);

    // document: renderedDocument,
    //	meta: md.meta


  }

}
