import sanitize from "sanitize-html";

/**
 * Allowlist sanitizer for admin-authored rich text (Jodit output).
 *
 * Replaces the earlier regex-based stripper, which could be bypassed with
 * payloads such as `<svg/onload=...>` or unquoted `href=javascript:...`.
 * Everything not listed here is dropped; URLs are limited to safe schemes.
 */
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i;
const SAFE_LENGTH = /^-?[\d.]+(px|em|rem|%|pt)?$/i;

const OPTIONS: sanitize.IOptions = {
  allowedTags: [
    "p", "br", "hr", "div", "span",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "strong", "b", "em", "i", "u", "s", "strike", "del", "ins", "mark", "small", "sub", "sup",
    "blockquote", "pre", "code",
    "ul", "ol", "li",
    "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    col: ["span"],
    ol: ["start", "type"],
    "*": ["style", "class"],
  },
  allowedStyles: {
    "*": {
      "text-align": [/^(left|right|center|justify)$/i],
      color: [SAFE_COLOR],
      "background-color": [SAFE_COLOR],
      "font-weight": [/^(normal|bold|[1-9]00)$/i],
      "font-style": [/^(normal|italic)$/i],
      "text-decoration": [/^(none|underline|line-through)$/i],
      width: [SAFE_LENGTH],
      height: [SAFE_LENGTH],
    },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  disallowedTagsMode: "discard",
  transformTags: {
    // Links opened in a new tab must not get a handle on window.opener.
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        return { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } };
      }
      return { tagName, attribs };
    },
  },
};

export function sanitizeRichHtml(value: unknown): string {
  if (typeof value !== "string" || value.length === 0) return "";
  return sanitize(value, OPTIONS);
}
