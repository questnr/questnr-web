import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    url: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    parseTextToFindURL(text): string {
        let urls, output = null;
        while ((urls = this.url.exec(text)) !== null) {
            output = urls[0];
            // console.log("URLS: " + output);
        }
        return output;
        // if (urls = this.url.exec(text) == null) {
        //   return null;
        // }
    }
}