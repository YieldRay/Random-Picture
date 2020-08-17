const RandomPicture = Object.create(null);
// https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement
Object.assign(RandomPicture, {
            getElement: function(arr, timeout = 5000) {
                if (typeof arr === 'string') arr = [arr]
                if (!Array.isArray(arr)) throw new Error('param must be array or string')
                if (isNaN(Number(timeout))) throw new Error('param must be number or string')
                return new Promise((resolve, reject) => {
                        let i = 0,
                            max = arr.length - 1
                        let process = () => {
                            let img = new Image()
                            img.src = arr[i]
                            let clock = setTimeout(() => {
                                img.remove()
                                i++
                                process()
                            }, timeout)

                            img.onload = () => {
                                clearTimeout(clock)
                                resolve(img)
                            }

                            img.onerror = () = > {
                                clearTimeout(clock)
                                img.remove()
                                i++
                                process()
                            }
                            if (i > max) reject(null)
                        }
                    }
                }
            })

        //RandomPicture.getElement(url).then(console.log)