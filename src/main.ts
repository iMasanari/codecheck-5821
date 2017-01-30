import * as request from 'request'

const ackey = '869388c0968ae503614699f99e09d960f9ad3e12'

interface ResponseData {
    status: 'ok' | 'ng'
    code: string
    result: {
        numFound: string
        start: string
        doc: {}[]
    }
}

async function main(argv: string[]) {
    // それぞれのキーワードで検索
    const responses = await Promise.all(argv.map(keyword =>
        getArchives(keyword, ackey)
    ))

    // キーワードと記事数を取得
    const nameAndCount = responses.map((response, i) => ({
        name: argv[i],
        count: +response.result.numFound
    }))

    // 記事数の多いものを取得
    const popular = nameAndCount.reduce((a, b) => a.count > b.count ? a : b)

    // 出力
    console.log(JSON.stringify(popular))
}

function getArchives(keyword: string, ackey: string) {
    const url = `http://54.92.123.84/search?q=${encodeURIComponent(`Body:${keyword}`)}&wt=json&ackey=${ackey}`

    return new Promise<ResponseData>(done => {
        request.get({ url, json: true, }, (error, response, body) => { done(body.response) })
    })
}

export = main
