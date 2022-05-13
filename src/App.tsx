import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// Fehlerhandling
import { ErrorProvider } from './components/systemMessages/SystemMessagesProvider';
import ErrorNotification from './components/systemMessages/SystemMessageNotification';
import { ErrorBoundary } from './components/systemMessages/ErrorBoundary';
// Anwendung
import { Dashboard } from './components/Dashboard';
import { AppBarProvider } from './components/appBar/AppBarProvider';
import { CompanyStore } from './components/company/companyStore';

/**
 * Gerüst der Anwendung.
 * Hier sollen alle Anwendungsübergreifenden Komponenten definiert werden.
 * @returns App
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
          {/* Alle notwendigen Provider einbinden... */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ErrorProvider>
                <AppBarProvider>
                  <CssBaseline>

                    {/* Anwendung und Globale Elemente einbinden */}
                    <ErrorNotification />

                    <CompanyStore>
                      <Dashboard />
                    </CompanyStore>                   

                  </CssBaseline>
                </AppBarProvider>
              </ErrorProvider>
            </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ErrorBoundary>
  );
};

export default App;
