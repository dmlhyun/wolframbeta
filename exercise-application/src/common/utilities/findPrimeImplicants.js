// from http://stackoverflow.com/a/11454049/309483

let combine = function (m, n) {
    var a = m.length, c = '', count = 0, i;
    for (i = 0; i < a; i++) {
        if (m[i] === n[i]) {
            c += m[i];
        } else if (m[i] !== n[i]) {
            c += '-';
            count += 1;
        }
    }

    if (count > 1) {
        return "";
    }

    return c;
};

let repeatelem = function(elem, count) {
    var accu = [],
    addOneAndRecurse = function(remaining) {
      accu.push(elem);
      if (remaining > 1) {
        addOneAndRecurse(remaining - 1);
      }
    };
    addOneAndRecurse(count);
    return accu;
};

let find_prime_implicants = function(data) {
    var newList = [].concat(data),
        size = newList.length,
        IM = [],
        im = [],
        im2 = [],
        mark = repeatelem(0, size),
        mark2,
        m = 0,
        i,
        j,
        c,
        p,
        n,
        r,
        q;
    for (i = 0; i < size; i++) {
        for (j = i + 1; j < size; j++) {
            c = combine(newList[i], newList[j]);
            if (c !== "") {
                im.push(c);
                mark[i] = 1;
                mark[j] = 1;
            }
        }
    }

    mark2 = repeatelem(0, im.length);
    for (p = 0; p < im.length; p++) {
        for (n = p + 1; n < im.length; n++) {
            if (p !== n && mark2[n] === 0 && im[p] === im[n]) {
                mark2[n] = 1;
            }
        }
    }

    for (r = 0; r < im.length; r++) {
        if (mark2[r] === 0) {
            im2.push(im[r]);
        }
    }

    for (q = 0; q < size; q++) {
        if (mark[q] === 0) {
            IM.push(newList[q]);
            m = m + 1;
        }
    }

    if (m !== size && size !== 1) {
        IM = IM.concat(find_prime_implicants(im2));
    }

    IM.sort();
    return IM;
}

module.exports = find_prime_implicants;
