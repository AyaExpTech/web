/**
 * やること
 * ・ページ読み込み時にクエリのIDを読んでメイン関数にIDだけ投げる
 * ・IDをもとにmdひっぱってきて変換して該当divにぶちこむ
 * ・ただしAeTOSだけは別のリポジトリにあるのでそれを直接読む
 */

/**
 * URLのクエリパラメータのうち、指定したキーのものの値を取得する。
 *
 * @param {string} name - パラメータのキー文字列
 * @return {url} - 対象のURL文字列（任意）
 */
function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    return location.search;
}

window.onload = function() {
    // ページ読み込み時に実行したい処理を書く
    // 本文markdownはクエリから引っ張る
    loadMarkdown(location.search.slice(1));
}

/**
 * ProjectIDと対応する記事のMarkdownを読んでHTMLに投げ込む
 * @param {String} id - ページのIDもといプロジェクトID
 */
function loadMarkdown(id) {
    if (id != "") {
        //とりあえず取得するmarkdownのファイルパスを変数に作る
        let filePath = "markdown/" + id + ".md";
        /**
         * 場合によって読み替えが必要なクエリがあるのでswitch文でそれを処理します
         */
        switch (id) {
            case "AXT_AeTOS": //綾急技研ライセンス『AeTOS』を表示するやつ→別のリポジトリにあるからそっちを見る
                filePath = "https://raw.githubusercontent." + "com/Aya" + "ExpTech/licence/main/AeTOS.md"; //licenseがスペルミスですがこれが正しい
                break;
            default:
                break;
        }
        //あとinnerHTMLを参照できるようにしておこう
        let el = document.getElementById("contents-body");
        //HTTPリクエストを送らないといけないらしいですよ？
        let req = new XMLHttpRequest();
        req.open("get", filePath, true);
        req.send(null);

        // レスポンスが返ってきたら、データを処理します。
        req.onload = function() {
            // marked.parse(markdown)で変換できるって書いてあった()
            let html = marked.parse(req.responseText);
            // できたHTMLをそのまま入れる
            el.innerHTML = html;
        }
    }
}