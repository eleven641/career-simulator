const SAVE_KEY = 'career_save';
const RANKING_KEY = 'career_ranking';

function saveGame(state) {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
        return true;
    } catch (e) {
        console.error('Save failed:', e);
        return false;
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return null;
    } catch (e) {
        console.error('Load failed:', e);
        return null;
    }
}

function deleteSave() {
    try {
        localStorage.removeItem(SAVE_KEY);
        return true;
    } catch (e) {
        console.error('Delete failed:', e);
        return false;
    }
}

function saveRanking(record) {
    try {
        const rankings = getRankings();
        rankings.push({
            ...record,
            timestamp: Date.now()
        });
        rankings.sort((a, b) => {
            const posOrder = ['P10', 'P9', 'P8', 'P7', 'P6', 'P5', 'P4', '实习生'];
            const posA = posOrder.indexOf(a.maxPosition) >= 0 ? posOrder.indexOf(a.maxPosition) : Infinity;
            const posB = posOrder.indexOf(b.maxPosition) >= 0 ? posOrder.indexOf(b.maxPosition) : Infinity;
            if (posA !== posB) return posA - posB;
            return b.finalMoney - a.finalMoney;
        });
        localStorage.setItem(RANKING_KEY, JSON.stringify(rankings.slice(0, 20)));
        return true;
    } catch (e) {
        console.error('Save ranking failed:', e);
        return false;
    }
}

function getRankings() {
    try {
        const saved = localStorage.getItem(RANKING_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    } catch (e) {
        console.error('Load rankings failed:', e);
        return [];
    }
}

function clearRankings() {
    try {
        localStorage.removeItem(RANKING_KEY);
        return true;
    } catch (e) {
        console.error('Clear rankings failed:', e);
        return false;
    }
}