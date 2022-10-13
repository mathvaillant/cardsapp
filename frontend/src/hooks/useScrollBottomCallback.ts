import React from 'react';

const useScrollBottomCallback = (callback: () => void, disableCallback: boolean, dependencies: any[]) => {
  React.useEffect(() => {
		if(disableCallback) return;

		window.onscroll = function() {
			if((window.innerHeight + document.documentElement.scrollTop) >= document.body.offsetHeight - 5) {
			  callback();	
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies, disableCallback]);
}

export default useScrollBottomCallback;