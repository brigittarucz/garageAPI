const fs = require('fs');

module.exports = class Artist {
    constructor(id, artistName, subgenre, url1, song1, lyrics1, vibe1, url2, song2, 
        lyrics2, vibe2, url3, song3, lyrics3, vibe3, dateAdded) {
            this.id = id;
            this.artistName = artistName;
            this.subgenre = subgenre;
            this.url1 = url1;
            this.song1 = song1;
            this.lyrics1 = lyrics1;
            this.vibe1 = vibe1;
            this.url2 = url2;
            this.song2 = song2;
            this.lyrics2 = lyrics2;
            this.vibe2 = vibe2;
            this.url3 = url3;
            this.song3 = song3;
            this.lyrics3 = lyrics3;
            this.vibe3 = vibe3;
            this.dateAdded = dateAdded;
    }
}