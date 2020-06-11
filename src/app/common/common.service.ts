import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    url: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    constructor(public snackbar: MatSnackBar) {

    }
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
        const d = new Date(value);
        let month = '01';
        let day: string;
        let dayInt: number = d.getDate();
        if (d.getMonth() + 1 < 10) {
            month = `0${d.getMonth() + 1}`;
        }
        if (dayInt < 10) {
            day = `0${dayInt}`;
        } else {
            day = `${dayInt}`
        }
        return `${d.getFullYear()}-${month}-${day}`;
    }

    copyToClipboard(str) {
        const copyText = document.createElement('textarea');
        copyText.value = str;
        copyText.setAttribute('readonly', '');
        copyText.style.position = 'absolute';
        copyText.style.left = '-9999px';
        document.body.appendChild(copyText);
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand('copy');
        document.body.removeChild(copyText);
        this.snackbar.open("Link copied to clipboard", 'close', { duration: 5000 });
    }
}