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
    indexOfUsingRegex(content, regex, startpos) {
        var indexOf = content.substring(startpos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
    }
    getDateFromNumber(value: string) {
        console.log("value", value);
        const d = new Date(value);
        let month = '01';
        if (d.getMonth() + 1 < 10) {
            month = `0${d.getMonth() + 1}`;
        }
        return `${d.getFullYear()}-${month}-${d.getDate()}`;
    }
}