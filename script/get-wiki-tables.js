/**
 * 获取宏指令的脚本，直接复制到 WIKI 网页内控制台运行。
 * https://ff14.huijiwiki.com/wiki/文本指令
 * 
 * 目前 WIKI 内有 12 个大类，每个大类对应一个标题和表格。
 * 此脚本运行后将会导出数据文件 macro.json 和 target.json，
 * 其中 macro.json 是按大类分组的宏指令数据，target.json 是*11. 代名词*的数据。
 * 
 * 将代码中 `FILE_TYPE = 'json'` 改为 `FILE_TYPE = 'csv'` 可以导出 csv 格式的数据。
 * 
 * 注意：因为存在特殊字符和 1~8 这样的情况，导出后还需要手动处理一遍。
 * 
 * 修改时间：2023年8月29日
 */
(function () {

  const FILE_TYPE = 'json';
  const NUM = 12;
  const titles = document.querySelectorAll('.mw-headline');
  const tables = document.querySelectorAll('.wikitable');

  if (titles.length !== tables.length) {
    alert(`分类与表格数量不匹配：${titles.length}/${tables.length}`);
    return;
  }
  if (titles.length !== NUM) {
    alert(`大类总数不再是 ${NUM} 个，注意修改`);
    return;
  }

  const jsonM = [];
  const jsonT = [];

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i].innerText.trim();
    const rows = tables[i].rows;

    // 代名词的情况
    if (title === '代名词') {
      for (let j = 1; j < rows.length; j++) {
        const cells = rows[j].cells;
        jsonT.push({
          'cmd': cells[0].innerText.trim(),
          'desc': cells[1].innerText.trim(),
        })
      }
      continue;
    }

    // 普通宏指令的情况
    for (let j = 1; j < rows.length; j++) {
      const cells = rows[j].cells;
      jsonM.push({
        'cmd_zh': cells[0].innerText.trim(),
        'cmd_en': cells[1].innerText.trim(),
        'cmd_zh_abbr': cells[2].innerText.trim(),
        'cmd_en_abbr': cells[3].innerText.trim(),
        'desc': cells[4].innerText.trim(),
        'type': title,
      })
    }
  }

  console.log('===== 宏指令 =====');
  console.log(JSON.stringify(jsonM));
  console.log('===== 代名词 =====');
  console.log(JSON.stringify(jsonT));

  // 保存为文件
  if (FILE_TYPE === 'json') {
    download(JSON.stringify(jsonM, '', '  '), 'macro.json');
    download(JSON.stringify(jsonT, '', '  '), 'target.json');
  } else if (FILE_TYPE === 'csv') {
    download(jsonToCSV(jsonM), 'macro.csv');
    download(jsonToCSV(jsonT), 'target.csv');
  }

  function download(content, fileName) {
    const aTag = document.createElement('a');
    const blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
  }

  function jsonToCSV(json) {
    let csv = '';
    const keys = []; 
    for (const key in json[0]) {
      keys.push(key);
    }
    csv += `${keys.join(',')}\n`;
    for (const iterator of json) {
      for (const k of keys) {
        csv += `"${iterator[k]}",`
      }
      csv = csv.slice(0, -1) + '\n';
    }
    return csv;
  }
})();