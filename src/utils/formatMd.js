import MarkdownIt from 'markdown-it';
import striptags from 'striptags';

const md = new MarkdownIt();

function formatMd(content) {
    let script = md.render(content);
    script = script.replaceAll('<pre>', '<div>');
    script = script.replaceAll('</pre>', '</div>');
    script = script.replaceAll('<code>', '<div>');
    script = script.replaceAll('</code>', '</div>');
    script = script.replaceAll('<p>', '<h4>');
    script = script.replaceAll('</p>', '</h4>');

    return <div className="max-w-[235px] space-y-1" dangerouslySetInnerHTML={{ __html: script || '' }}></div>;
}

export default formatMd;
