import React from 'react';

const useScrollBottomCallback = (callback: () => void, dependencies: any[]) => {
  React.useEffect(() => {
		window.onscroll = function() {
			if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			  callback();	
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies]);
}

export default useScrollBottomCallback;