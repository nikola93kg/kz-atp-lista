import React from 'react';
import '../../styles/VotingResults.css';

function VotingResults({ results, className  }) {
    
    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);

    return (
        <div className={`results-container ${className}`}>
            <h2 className="results-title">Results</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th className="rank">Rank</th>
                        <th className="person-name">Name</th>
                        <th className="vote-count">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedResults.map(([person, votes], index) => (
                        <tr key={person}>
                            <td className="rank">{index + 1}</td>
                            <td className="person-name">{person}</td>
                            <td className="vote-count">{votes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VotingResults;
