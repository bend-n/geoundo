let today = +document.querySelector(".page-title").innerHTML.replace(/[^0-9]+/, "");
function get() {
    let c = JSON.parse(localStorage.getItem("userData"));
    return { data: c[today], raw: c }
}
let last = undefined;
let c = get();

setInterval(() => {
    let n = get();
    if (!n.data) return;
    if (c.data === undefined) {
        console.log("started")
        c = n;
        return;
    }
    if (c.data.board.toString() !== n.data.board.toString()) {
        console.log("change detected")
        last = c.raw;
        c = n;
        console.log("last board stored", c.data.board)
    }
}, 500)
const reset = () => {
    delete c.raw[today];
    localStorage.setItem("userData", JSON.stringify(c.raw));
    window.location.reload();
};

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'z' && c.data !== undefined) {
        if (last === undefined) {
            reset()
        } else {
            localStorage.setItem("userData", JSON.stringify(last));
            window.location.reload();
        }
    }
    if (event.altKey && event.key === 'r' && c.data !== undefined) {
        reset()
    }
});