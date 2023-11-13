import React, { useState, useEffect } from 'react';
import '../../styles/VotingResults.css';
import '../../styles/WeeklyResults.css';

function WeeklyResults({className }) {
    const [weeklyResults, setWeeklyResults] = useState({});

    useEffect(() => {
        const fetchWeeklyResults = async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote/results/weekly`);
                if (response.ok) {
                    let data = await response.json();
                    setWeeklyResults(data);
                } else {
                    console.error("Failed to fetch weekly results.");
                }
            } catch (error) {
                console.error("An error occurred while fetching weekly results:", error);
            }
        };

        fetchWeeklyResults();
    }, []);

    const sortedWeeklyResults = Object.entries(weeklyResults).sort((a, b) => b[1] - a[1]);

    return (
        <div className={`results-container ${className} results-container-weekly`}>
            <h2 className="results-title">Weekly Results</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th className="rank">Rank</th>
                        <th className="person-name">Name</th>
                        <th className="vote-count">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedWeeklyResults.map(([person, votes], index) => (
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

export default WeeklyResults;
