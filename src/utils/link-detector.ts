

/**
 * Detects whether a given text contains a valid URL and executes a callback function with the result.
 *
 * @param {string} text - The input text to be checked for a URL.
 * @param {function} callback - A callback function that is invoked with a boolean indicating
 * whether the text contains a valid link.
 */

export const linkDetector = (text: string, callback: (isLink: boolean) => void) => {
  const urlRegex = /(https?:\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/i;
  const isLink = urlRegex.test(text);
    if(isLink){

        callback(isLink);


    }
    else {
        console.warn('Not a link', isLink);
        
    }
};
