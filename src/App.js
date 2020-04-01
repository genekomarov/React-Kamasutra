import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Content/Profile/Profile";
import Dialogs from "./components/Content/Dialogs/Dialogs";
import News from "./components/Content/News/News";
import Music from "./components/Content/Music/Music";
import Settings from "./components/Content/Settings/Settings";
import {Route} from "react-router-dom";


const App = (props) => {
    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*//Передача компоненты через 'component'*/}
                    {/*<Route path='/profile' component={Profile}/>
                    <Route path='/dialogs' component={Dialogs}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>*/}

                    {/*//Передача компоненты через 'render'*/}
                    <Route path='/profile' render={ () => <Profile state={props.state.profilePage} addPost={props.addPost}/>  } />
                    <Route path='/dialogs' render={ () => <Dialogs state={props.state.dialogsPage}/>  } />
                    <Route path='/news' render={ () => <News /> } />
                    <Route path='/music' render={ () => <Music /> } />
                    <Route path='/settings' render={ () => <Settings /> } />
                </div>
            </div>
    );
};

export default App;
