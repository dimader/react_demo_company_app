import React from "react";

/**
 * Wird vom Suspense verwendet und angezeigt solange noch nicht alle Daten geladen wurden. 
 * @returns Lade-Dialog
 */
function Loading() {
    return (
        <div className="App">
            <div>loading...</div>
        </div>
  );
}

export default Loading;
