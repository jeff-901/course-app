import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
// import instructions from './instruction.md';


export default function Instruction(props) {
    const markdown = `
    # Header 1
    ## Header 2
        + one
        + two
        + three
    _ italic _

    ** bold **

    <b> bold Html </b>
    `;
    const input = '# Instruction\n\n## 搜尋\n\n+ 您可選擇：「全部查詢」、「院系所查詢」、「通識課程」、「共同必修」、「學程」、「其他全校性課程」。\n+ 輸入課名時可以以簡稱搜尋，如「森林生物多樣性概論」可以「森多概」進行搜尋。\n+ 選擇時間中的表格中可以選取您有空堂的時間進行搜尋。\n+ 點選「標籤」即可查詢具有該標籤的課程。\n+ 點選「加入」即可將課程加入「我的課表」中。\n+ 點選「評論」即可對該課程發表評論。\n\n## 我的課表\n\n+ 左側會顯示所有被您加入的課程。\n+ 點選「加入」即可將課程加入右側的課表中。\n+ 點選「刪除」則可以取消選取該課程。\n\n## 評論\n\n+ 您可以在「所有評論」中看到所有使用者對該課程的評價。\n+ 您可以在「加入/修改評論」中發表對於該課程的評價，或對您已經發表的評價進行修改。\n';
    return(
        <div className="Instruction">
            <ReactMarkdown
                source={input}
            />
        </div>
    );
}
