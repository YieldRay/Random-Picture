const randomPicture = function (arr, timeout = 5000, cb = img => console.log(img)) {
    if (typeof arr === 'string') arr = [arr];
    if (!Array.isArray(arr)) throw new Error('param must be array or string');
    if (isNaN(Number(timeout))) throw new Error('param must be number or string');
    for (let imgsrc of arr) {
        let img = new Image();
        img.src = imgsrc;
        let clock = setTimeout(() => {
            img.remove();
            return;
        }, timeout);
        img.addEventListener('load', () => {
            clearTimeout(clock);
            cb(img);
            return;
        });

        img.addEventListener('error', () => {
            clearTimeout(clock);
            img.remove();
        });
    }
};

// randomPicture('https://random-picture.vercel.app/api/', 5000, img => console.log(img.currentSrc));
