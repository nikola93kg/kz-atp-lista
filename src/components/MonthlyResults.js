import React, { useState, useEffect } from 'react';
import '../styles/MonthlyResults.css';

function MonthlyResults({className }) {
    const [monthlyResults, setMonthlyResults] = useState({});

    useEffect(() => {
        const fetchMonthlyResults = async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote/results/monthly`);
                if (response.ok) {
                    let data = await response.json();
                    setMonthlyResults(data);
                } else {
                    console.error("Failed to fetch monthly results.");
                }
            } catch (error) {
                console.error("An error occurred while fetching monthly results:", error);
            }
        };

        fetchMonthlyResults();
    }, []);

    const sortedResults = Object.entries(monthlyResults).sort((a, b) => b[1] - a[1]);

    return (
        <div className={`results-container ${className} results-container-monthly`}>
            <h2 className="results-title">Monthly Results</h2>
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

export default MonthlyResults;
