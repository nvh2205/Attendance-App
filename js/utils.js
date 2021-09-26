import BaseComponent from "./BaseComponent.js";

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {Array<BaseComponent>} components
 */
export function appendTo($element, ...components) {
    for (let component of components) {
        let child = component.refresh();
        // console.log(child);
        $element.appendChild(child);
    }
}

export function renderHtml([first, ...strings], ...values) {
    return values.reduce(
        (acc, current) => acc.concat(current, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

export function date(date) {
    //     Date.prototype.yyyymmdd = function() {
    //         var mm = this.getMonth() + 1; // getMonth() is zero-based
    //         var dd = this.getDate();

    //         return [this.getFullYear(),
    //                 (mm>9 ? '' : '0') + mm,
    //                 (dd>9 ? '' : '0') + dd
    //                ].join('');
    //       };

    //       var date = new Date();
    //    return date.yyyymmdd();

    date = new Date(date).toISOString().replace(/T.*/, '').split('-').join('-');
    return date;


}

// sort-date and remove duplicate element
export function filterDate(arr) {
    var formArr = arr.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a) - new Date(b);
    });

    var newArr = [formArr[0]]
    for (let i = 1; i < formArr.length; i++) {
        if (formArr[i] !== formArr[i - 1]) {
            newArr.push(formArr[i])
        }
    }
    return newArr
}