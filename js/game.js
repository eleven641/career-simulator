const DEBUG_MODE = window.location.search.includes('debug=1');

function createGameState(education, major, personality, company) {
    const stats = generateInitialStats(education, major, personality, company);
    return {
        year: 1,
        quarter: 1,
        age: 22,
        position: 'intern',
        company: company,
        education: education,
        major: major,
        personality: personality,
        stats: stats,
        performance: 50,
        performanceHistory: [],
        decisions: [],
        mindHistory: [],
        maxPosition: 'intern',
        eventsCompleted: [],
        currentEvent: null,
        eventIndex: 0,
        isDecisionPhase: true,
        quarterCompleted: false
    };
}

function applyEffects(stats, effects) {
    const changes = {};
    for (const key in effects) {
        if (effects.hasOwnProperty(key)) {
            const change = effects[key];
            if (key === 'money') {
                stats.money = Math.max(0, stats.money + change);
            } else {
                stats[key] = Math.max(0, Math.min(100, stats[key] + change));
            }
            changes[key] = change;
        }
    }
    return changes;
}

function checkCondition(condition, year, position, age, stats) {
    if (condition === 'random') return true;
    if (typeof condition === 'function') {
        return condition(year, position, age, stats);
    }
    return true;
}

function getRandomEvents(state, count = 1) {
    const availableEvents = EVENTS.filter(event => {
        if (state.eventsCompleted.includes(event.id)) return false;
        return checkCondition(event.triggerCondition, state.year, state.position, state.age, state.stats);
    });
    
    if (availableEvents.length === 0) return [];
    
    const weightedEvents = availableEvents.flatMap(event => 
        Array(event.weight).fill(event)
    );
    
    const selected = [];
    for (let i = 0; i < count; i++) {
        if (weightedEvents.length === 0) break;
        const index = Math.floor(Math.random() * weightedEvents.length);
        selected.push(weightedEvents[index]);
        weightedEvents.splice(index, 1);
    }
    
    return selected;
}

function calculatePerformance(state) {
    const { stats, position } = state;
    let perf = 50;
    
    perf += Math.floor(stats.ability / 10);
    perf += Math.floor(stats.connection / 20);
    
    if (stats["996"] > 80) perf += 10;
    if (stats["996"] < 30) perf -= 10;
    
    if (stats.health < 30) perf -= 15;
    if (stats.mind < 30) perf -= 10;
    
    const posBonus = POSITIONS.find(p => p.id === position)?.salary || 0;
    perf += Math.floor(posBonus / 10);
    
    return Math.max(0, Math.min(100, perf + Math.floor(Math.random() * 20) - 10));
}

function getPerformanceRating(perf) {
    if (perf >= 90) return 'A';
    if (perf >= 60) return 'B';
    return 'C';
}

function checkPromotion(state) {
    const posIndex = POSITIONS.findIndex(p => p.id === state.position);
    if (posIndex >= POSITIONS.length - 1) return false;
    
    const perfRating = getPerformanceRating(state.performance);
    const abilityReq = (posIndex + 1) * 20;
    
    if (perfRating === 'A' && state.stats.ability >= abilityReq) {
        state.position = POSITIONS[posIndex + 1].id;
        if (POSITIONS[posIndex + 1].id > state.maxPosition) {
            state.maxPosition = POSITIONS[posIndex + 1].id;
        }
        return true;
    }
    return false;
}

function checkLayoff(state) {
    const cCount = state.performanceHistory.filter(p => getPerformanceRating(p) === 'C').length;
    if (cCount >= 2) return true;
    
    if (state.age >= 35 && !['P7', 'P8', 'P9', 'P10'].includes(state.position)) {
        const layoffChance = 0.3 + (state.age - 35) * 0.05;
        if (Math.random() < layoffChance) return true;
    }
    
    return false;
}

function applyPersonalityEffects(state) {
    const pers = PERSONALITIES.find(p => p.id === state.personality);
    if (!pers) return;
    
    const effects = {};
    
    if (pers.abilityGain) effects.ability = pers.abilityGain;
    if (pers.mindGain) effects.mind = pers.mindGain;
    if (pers.healthGain) effects.health = pers.healthGain;
    if (pers.connectionGain) effects.connection = pers.connectionGain;
    if (pers.mindCost) effects.mind = -pers.mindCost;
    if (pers.healthCost) effects.health = -pers.healthCost;
    if (pers.connectionCost) effects.connection = -pers.connectionCost;
    
    applyEffects(state.stats, effects);
}

function addSalary(state) {
    const pos = POSITIONS.find(p => p.id === state.position);
    const comp = COMPANIES.find(c => c.id === state.company);
    
    if (!pos || !comp) return;
    
    const salary = pos.salary * comp.bonus;
    state.stats.money += Math.floor(salary);
    return Math.floor(salary);
}

function apply996Effects(state) {
    if (state.stats["996"] > 90) {
        if (Math.random() < 0.1) {
            state.stats.health = 0;
            return 'sudden_death';
        }
    }
    
    if (state.stats["996"] > 80) {
        state.stats.health = Math.max(0, state.stats.health - 5);
    } else if (state.stats["996"] > 60) {
        state.stats.health = Math.max(0, state.stats.health - 2);
    }
    
    return null;
}

function checkEnding(state) {
    if (state.stats.health <= 0) {
        return ENDINGS.find(e => e.id === 'ending_death');
    }
    
    for (const ending of ENDINGS) {
        if (ending.id !== 'ending_normal' && 
            ending.condition(state.stats, state.maxPosition, state.age, state.decisions, state.mindHistory)) {
            return ending;
        }
    }
    
    if (state.year > 30) {
        return ENDINGS.find(e => e.id === 'ending_normal');
    }
    
    return null;
}

function advanceQuarter(state) {
    state.quarter++;
    state.isDecisionPhase = true;
    state.currentEvent = null;
    state.eventIndex = 0;
    state.quarterCompleted = false;
    
    if (state.quarter > 4) {
        state.quarter = 1;
        state.year++;
        state.age++;
        
        const perf = calculatePerformance(state);
        state.performance = perf;
        state.performanceHistory.push(perf);
        
        addSalary(state);
        
        checkPromotion(state);
        
        if (checkLayoff(state)) {
            state.stats.money += 20;
            return { type: 'layoff' };
        }
    }
    
    const ending = checkEnding(state);
    if (ending) {
        return { type: 'ending', ending };
    }
    
    return { type: 'continue' };
}

function showRanking() {
    const rankings = getRankings();
    const list = document.getElementById('ranking-list');
    
    if (rankings.length === 0) {
        list.innerHTML = '<p class="empty">暂无记录</p>';
    } else {
        list.innerHTML = rankings.map((r, i) => `
            <div class="ranking-item">
                <div class="rank">#${i + 1}</div>
                <div class="info">
                    <div class="name">${r.nickname}</div>
                    <div class="ending">${r.ending}</div>
                </div>
                <div class="stats">
                    <div>最高职级: ${r.maxPosition}</div>
                    <div>存款: ${r.finalMoney}万</div>
                </div>
            </div>
        `).join('');
    }
    
    document.getElementById('ranking-modal').style.display = 'flex';
}

function closeRanking() {
    document.getElementById('ranking-modal').style.display = 'none';
}

function getPositionName(positionId) {
    return POSITIONS.find(p => p.id === positionId)?.name || positionId;
}

function getCompanyName(companyId) {
    return COMPANIES.find(c => c.id === companyId)?.name || companyId;
}