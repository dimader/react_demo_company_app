import React from 'react';

type ErrorState = {
    hasError: boolean,
    error?: Error,
    errorInfo?: React.ErrorInfo
};

type Props = {};

/**
 * React Error Boundary - Es werden alle unbehandelten Fehler gefangen die aus den Kind-Komponenten geworfen werden.
 * Mit folgenden Ausnahmen:
 * - Fehler in Event Handlern werden hier NICHT gefangen.
 * - Fehler im async Code ebenfalls nicht.
 * - Fehler beim Server-Side-Rendering ebenfalls nicht.
 * - Fehler welche diese Komonente selbst wirft werden ebenfalls nicht gefangen/behandelt.
 * Info: https://reactjs.org/docs/error-boundaries.html
 * 
 * Für Entwickler wird eine weitere Fehlermeldung im GUI aufgeschaltet, diese muss mit X beendet werden um diesen Fehlerdialog zu sehen.
 * 
 * Die Komponente MUSS als Klasse umgesetzt werden, eine entsprechung für Funktionale Komponenten gibt es aktuell noch nicht.
 */
export class ErrorBoundary extends React.Component<Props, ErrorState> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public static getDerivedStateFromError(_: unknown): Partial<ErrorState> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        })

        console.error('Uncaught error:', error, errorInfo);
    }
    
    public render() {
      if (this.state.hasError) {
        // Fehler
        return (
          <div>
            <h2>Da ist wohl ein Fehler aufgetreten...</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }

      // Verhalten wenn kein Fehler vorhanden ist.
      return this.props.children;
    }  
};
