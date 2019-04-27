const RE = {
  num: /[0-9]/,
  positive_float: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
  mobile: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
};

export default function validation (rex, val) {
  return !RE[rex].test(val);
}
