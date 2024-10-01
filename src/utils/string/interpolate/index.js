/**
 * Evaluate string to replace all matching placeholder keys with corresponding value pair provided
 * Example of text arg - "This is {{key}}."
 * @param {string} text
 * @param {Object.<string, string | number>} params
 */
function interpolate(text, params) {
  let str = text;
  for (const [key, value] of Object.entries(params)) {
    const regex = RegExp(`{{${key}}}`, "g");
    let matches;
    while ((matches = regex.exec(str)) !== null)
      str = str.replace(matches[0], value);
  }
  return str;
}

module.exports = {
  interpolate,
};
