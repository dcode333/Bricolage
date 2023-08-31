import React, { createContext, useState } from 'react';
export const MyContext = createContext();
import { en, ar } from '../utils/localaize'

// create a provider component
export const Global = ({ children }) => {
    // initialize states
    const apiKey = '3b212096897849988c0c863128175f2f'; // Replace with your actual API key
    const endpoint = 'https://api.cognitive.microsofttranslator.com/'; // Replace with the actual endpoint URL
    const baseurl = "https://umair-nightgown-fawn.cyclic.app"
    // http://192.168.100.19:5000
    // https://smiling-nightgown-fawn.cyclic.app
    //umair-nightgown-fawn
    const [token, setToken] = useState(null);
    const [user, SetUser] = useState(null);
    const [jobRefetcher, setJobRefetcher] = useState(false); //used to refetch jobs after posting a new job
    const [lang, setLang] = useState(en);
    const [currentLang, setCurrentLang] = useState(false); //false=english, true=arabic

    // define function to update states
    const updateUser = (user) => { SetUser(user) };

    const updateToken = (tok) => { setToken(tok) };

    const updateLang = (lang) => {
        if (lang === 'en') {
            setCurrentLang(false);
            setLang(en);
        }
        else {
            setCurrentLang(true);
            setLang(ar);
        }
    };

    // pass states and functions to value prop
    const value = {
        apiKey,
        endpoint,
        user,
        updateUser,
        token,
        updateToken,
        lang,
        updateLang,
        currentLang,
        baseurl,
        en,
        ar,
        jobRefetcher,
        setJobRefetcher
    };

    // return the provider with the value prop
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};
