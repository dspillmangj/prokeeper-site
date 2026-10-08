document.addEventListener('DOMContentLoaded', () => {
    // Interactive Playground State
    let homeScore = 18;
    let awayScore = 15;
    let period = 2;
    let clock = '06:22';

    const input = document.getElementById('demoInput');
    const feedback = document.getElementById('demoFeedback');
    const homeScoreEl = document.getElementById('demoHomeScore');
    const awayScoreEl = document.getElementById('demoAwayScore');
    const logEl = document.getElementById('demoLog');

    const actions = {
        'X': { name: '2pt Field Goal MADE', pts: 2, teamPts: 'same' },
        'Z': { name: '2pt Field Goal Missed', pts: 0 },
        'M': { name: '3pt Field Goal MADE', pts: 3, teamPts: 'same' },
        'N': { name: '3pt Field Goal Missed', pts: 0 },
        'B': { name: 'Free Throw MADE', pts: 1, teamPts: 'same' },
        'V': { name: 'Free Throw Missed', pts: 0 },
        'D': { name: 'Defensive Rebound', pts: 0 },
        'O': { name: 'Offensive Rebound', pts: 0 },
        'A': { name: 'Assist', pts: 0 },
        'S': { name: 'Steal', pts: 0 },
        'K': { name: 'Block', pts: 0 },
        'F': { name: 'Personal Foul', pts: 0 },
        // Volleyball actions
        'KILL': { name: 'Volleyball KILL', pts: 1, teamPts: 'same' },
        'ACE': { name: 'Service ACE', pts: 1, teamPts: 'same' },
    };

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = input.value.trim().toUpperCase();
                if (!val) return;

                const match = val.match(/^([0-9]{1,3}|00)\s*([=\-])\s*([A-Za-z]+)$/);
                if (!match) {
                    feedback.textContent = 'Invalid format. Use <Jersey>-<Action> (e.g. 23-X) or <Jersey>=<Action>';
                    feedback.className = 'feedback error';
                    return;
                }

                const jersey = match[1];
                const team = match[2] === '-' ? 'HOME' : 'AWAY';
                const code = match[3];

                const act = actions[code];
                if (!act) {
                    feedback.textContent = `Unknown action code "${code}". Try X, M, B, D, A, S, K, F`;
                    feedback.className = 'feedback error';
                    return;
                }

                if (act.pts > 0) {
                    if (team === 'HOME') {
                        homeScore += act.pts;
                        homeScoreEl.textContent = homeScore;
                    } else {
                        awayScore += act.pts;
                        awayScoreEl.textContent = awayScore;
                    }
                }

                const msg = `${team} #${jersey}: ${act.name}` + (act.pts > 0 ? ` (+${act.pts} pts)` : '');
                feedback.textContent = msg;
                feedback.className = 'feedback success';
                input.value = '';

                // Add to demo log
                if (logEl) {
                    const row = document.createElement('div');
                    row.className = 'log-item';
                    row.innerHTML = `<span class="team-tag ${team.toLowerCase()}">${team}</span> <span>${msg}</span> <strong class="score-tag">${homeScore}-${awayScore}</strong>`;
                    logEl.insertBefore(row, logEl.firstChild);
                }
            }
        });
    }
});
