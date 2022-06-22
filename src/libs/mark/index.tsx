const mark = ( title:string, keyword:string ) => {
  if (!keyword) {
    return title
  }

  const a = title.toLowerCase();
  const b = keyword.toLowerCase();

  const indexof = a.indexOf(b);
  const c = indexof > -1 ? title.substr(indexof, keyword.length) : '';
  const val = `<span style="color:red;">${c}</span>`;
  const regS = new RegExp(keyword, 'gi');
  return title.replace(regS, val);
}

export default mark
