// @ts-ignore
if (!String.prototype.replaceAll) {
  // @ts-ignore
  String.prototype.replaceAll = function (str: string, newStr: string) {

    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }

    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);

  };
}
