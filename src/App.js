import React, { useState, useEffect } from "react";
import VotingForm from "./components/VotingForm";
import VotingResults from "./components/results/VotingResults";
import Toast from "./components/toast/Toast";
import "./styles/App.css";
import WeeklyResults from "./components/results/WeeklyResults";
import MonthlyResults from "./components/results/MonthlyResults";
import Navbar from './components/Navbar';
import themeMusic from './assets/theme.mp3';
import AddPerson from './components/crud/AddPerson'
import DeletePerson from './components/crud/DeletePerson'
import UpdatePerson from './components/crud/UpdatePerson'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useToast } from './store/ToastContext';
import ToastsContainer from './components/toast/ToastContainer';

function App() {
    
    const [results, setResults] = useState({});
    const [hasVoted, setHasVoted] = useState(false);
    const [viewStyle, setViewStyle] = useState({});
    const [resultsView, setResultsView] = useState('regular');
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { toasts, addToast } = useToast(); 
    

    useEffect(() => {
        const fetchResults = async () => {
            try {   
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote/results`);
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data);
            } catch (error) {
                addToast(`An error occurred while fetching results: ${error.message}. Please try again.`);
            }
        };
    
        fetchResults();
    }, []);

    const handleVote = async (selectedPerson) => {

        if (!selectedPerson || !selectedPerson.id) {
            addToast("Please select a person before voting.", "error");
            return;
        }
    
        setViewStyle({ opacity: 0.8, backgroundColor: 'rgba(0, 0, 0, 0.9)' });
        setTimeout(async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/vote`, {
                    method: "POST",
                    body: JSON.stringify({ personId: selectedPerson.id }),
                    headers: { "Content-Type": "application/json" },
                });
    
                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        let errorData = await response.json();
                        throw new Error(errorData.message || "Failed to vote.");
                    } else {
                        throw new Error(await response.text());
                    }
                }
    
                const messageText = await response.text();
                addToast(messageText, "success");
    
                setResults(prevResults => ({
                    ...prevResults,
                    [selectedPerson.name]: (prevResults[selectedPerson.name] || 0) + 1,
                }));
                setHasVoted(true);
                setResultsView('regular');
            } catch (error) {
                addToast(error.message || "An error occurred. Please try again.");
            } finally {
                setViewStyle({ opacity: 1, backgroundColor: 'transparent' });
            }
        }, 300); 
    };

    const toggleResultsView = (viewType) => {
        setResultsView(viewType);
    };

    const handlePlayMusic = () => {
        if (!audio) {
            const newAudio = new Audio(themeMusic);
            setAudio(newAudio);
            newAudio.play();
            setIsPlaying(true);  
        } else {
            if (audio.paused) {
                audio.play();
                setIsPlaying(true);  
            } else {
                audio.pause();
                setIsPlaying(false);  
            }
        }
    };

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
        };
    }, [audio]);

    return (
        <Router>
            <div className="main-div" style={viewStyle}>
                <Navbar onPlayMusic={handlePlayMusic} playState={isPlaying} />
                <Routes>
                    <Route path="/admin/add" element={<AddPerson />} />
                    <Route path="/admin/update" element={<UpdatePerson />} />
                    <Route path="/admin/delete" element={<DeletePerson />} />
                    <Route path="/" element={
                        <>
                            <h1>Please vote for the best player of all time</h1>
                            <p>Please note: you can only vote once every 24 hours</p>
                            {!hasVoted ? (
                                <VotingForm onVote={handleVote} />
                            ) : (
                                <div className="results-wrapper">
                                    <VotingResults results={results} className={resultsView === 'regular' ? 'active' : ''} />
                                    <WeeklyResults className={resultsView === 'weekly' ? 'active' : ''} />
                                    <MonthlyResults className={resultsView === 'monthly' ? 'active' : ''} />
                                </div>
                            )}
                            {toasts.map(toast => <Toast key={toast.id} message={toast.message} type={toast.type} />)}
                            {hasVoted && (
                                <div className="results-buttons">
                                    <button onClick={() => toggleResultsView('regular')}>Results</button>
                                    <button onClick={() => toggleResultsView('weekly')}>Weekly Results</button>
                                    <button onClick={() => toggleResultsView('monthly')}>Monthly Results</button>
                                </div>
                            )}
                        </>
                    } />
                </Routes>
                <ToastsContainer />
            </div>
        </Router>
    );
    
}

export default App;
