// lib/fourHarm.js
// 4害計算模組（根據你提供的 PDF 文件）

class FourHarm {
    constructor(qimenData) {
        this.qimen = qimenData;
    }

    // 計算單一宮位的 4害
    calculateGongHarm(gongNumber) {
        const harm = {
            menPo: false,      // 門迫
            jiXing: false,     // 擊刑
            ruMu: false,       // 入墓
            kongWang: false,   // 空亡
            yiMa: false        // 驛馬
        };

        const gongText = this.qimen.jiuGongAnalysis[gongNumber] || {};
        const baMen = gongText.men || '';
        const tianGan = this.qimen.sanQiLiuYi ? this.qimen.sanQiLiuYi[gongNumber] : '';

        // 1. 門迫（門剋宮）
        if (baMen) {
            // 這裡可以根據 PDF 的門迫表來判斷（你之前提供的 PDF 有門迫表）
            // 暫時用簡單關鍵字判斷，之後可以再精準
            if (baMen.includes('傷') || baMen.includes('杜')) harm.menPo = true;
            if (baMen.includes('驚') || baMen.includes('開')) harm.menPo = true;
        }

        // 2. 擊刑（天干擊刑宮位）
        if (tianGan) {
            const jiXingMap = {
                '4': ['壬', '癸'],
                '9': ['辛'],
                '2': ['己'],
                '3': ['戊'],
                '8': ['庚']
            };
            if (jiXingMap[gongNumber] && jiXingMap[gongNumber].includes(tianGan)) {
                harm.jiXing = true;
            }
        }

        // 3. 入墓
        const ruMuMap = {
            '2': ['甲', '乙', '癸'],
            '4': ['辛', '壬'],
            '6': ['乙', '丙', '戊'],
            '8': ['丁', '己', '庚']
        };
        if (ruMuMap[gongNumber] && ruMuMap[gongNumber].includes(tianGan)) {
            harm.ruMu = true;
        }

        // 4. 空亡（使用原作者已計算的 kongWangGong）
        if (this.qimen.kongWangGong && this.qimen.kongWangGong.includes(gongNumber.toString())) {
            harm.kongWang = true;
        }

        // 5. 驛馬（使用原作者已計算的 maStar）
        if (this.qimen.maStar && this.qimen.maStar.gong === gongNumber.toString()) {
            harm.yiMa = true;
        }

        return harm;
    }

    // 計算全部9宮
    getAllHarm() {
        const result = {};
        for (let i = 1; i <= 9; i++) {
            result[i] = this.calculateGongHarm(i);
        }
        return result;
    }
}

module.exports = FourHarm;
