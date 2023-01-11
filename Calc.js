var kThisYear = (new Date()).getFullYear(),
    kThisYearSub = (kThisYear + "").substr(2, 2);

function InterpretYear(b, a) {
    if (b == null) {
        b = this
    }
    switch (b.value.length) {
        case 0:
            b.value = kThisYear;
            break;
        case 1:
            b.value = "200" + b.value;
            break;
        case 2:
            if (b.value > kThisYearSub) {
                b.value = "19" + b.value
            } else {
                b.value = "20" + b.value
            }
            break;
        default:
    }
    if (a && b.value > a) {
        b.className = "err"
    }
}

function LinearInterp(c, a, b) {
    if (c === null || a === null || b === null) {
        return 0
    }
    b -= Math.floor(b);
    if (b == 0) {
        return c
    }
    return c + ((a - c) * b)
}

function LinearInterpArray(b, c) {
    if (!b) {
        return 0
    }
    if (!c) {
        c = 0
    }
    var a = Math.floor(c);
    return LinearInterp(b[a], b[a + 1], c)
}
$(function() {
    var h = true,
        j = false,
        l = $('[name="f"]'),
        a = $('[name="saved_set_id"]'),
        i = $('[name="set_name"]'),
        d = i.val(),
        p = $('[name="delete_set"]'),
        b = $('[name="fa"]').val(),
        k = $('[name="save_data"]'),
        o = $("#saved_set_right"),
        c = $("#calc_print"),
        f = $('[name="print_page"]'),
        n = $("#print_page_right");
    if (a) {
        a.change(function() {
            l.attr("action", "/calculator/loaddataset");
            l.attr("method", "get");
            l.trigger("submit")
        })
    }
    if (k) {
        k.mouseup(m)
    }
    o.click(m);
    if (f) {
        f.mouseup(g)
    }
    n.click(g);
    if (p) {
        p.change(function() {
            return confirm("Are you want  to delete this data set?")
        })
    }
    c.click(function() {
        if (window.print) {
            print(window.print())
        }
    });

    function g() {
        window.open(".?fa=print", "", "height=720,width=671,resizable=yes,                  scrollbars=1")
    }

    function m() {
        if (b == "index" && (a.val() == "" || d != i.val())) {
            l.submit();
            return
        } else {
            $.post("/calculator/savedata", l.serialize(), e, "json")
        }
        if (k) {
            k.disabled = h
        }
        o.animate({
            opacity: 0.3
        }, 0.2);
        return j
    }

    function e(q) {
        if (q.error) {
            alert(q.error.message);
            return
        }
        if (k) {
            k.disabled = j
        }
        o.html("Save to data set “" + q.result + "”");
        o.animate({
            opacity: 1
        }, 0.2)
    }
});
